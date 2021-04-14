const Song =  require('../../../songs/models');
const ObjectID = require('mongodb').ObjectID;
const PlayList = require('../../models');
const {checkUserLoggedIn} = require('../../../user/api');
const _get = require('lodash.get');

const sortSongsByOrderArray = (orderArray = [], originalArray = [])=>{
    const orderArrayShallowCopy = orderArray.slice();
    const originalArrayShallowCopy = originalArray.slice();
    let currentSong;
    while(currentSong = (originalArrayShallowCopy || []).shift()){
        orderArrayShallowCopy[orderArrayShallowCopy.indexOf(currentSong._id.toString())] = currentSong;
    }
    return orderArrayShallowCopy;
}

const songListResolver = async (playlist)=>{
    try{
       const songListShallowCopyWithOriginalOrder = (playlist.songs|| []).slice().map((obj)=>obj.toString());
       const songListInDB = await Song.find({_id: {$in:playlist.songs}});
       const finalOrderedArray =  sortSongsByOrderArray(songListShallowCopyWithOriginalOrder, songListInDB);
       return finalOrderedArray;
    }catch(e){
        console.log("caught error in the song resolver - playlist resolver :: ", e);
    }
}

const playListResolver = async (query, args, request)=>{
    try {
        const userName = _get(request,'session.user.userName');
        const queryObj = {
            createdBy: userName
        };
        if(args.id){
            queryObj._id =  ObjectID(args.id);
        }
        const playlistInDB = await PlayList.find(queryObj);
        return playlistInDB;
    }catch(e){
        console.log("caught error in the playlist resolver :: ", e);
    }
}

const createPlayListResolver = async(query, args, request)=>{
    let userName;
    const isUserLoggedIn =  await checkUserLoggedIn(request.session);
    if(isUserLoggedIn){
        userName = _get(request,'session.user.userName');
        const playListObject = {
            name:args.name,
            createdBy: userName,
            created: new Date(),
            lastModified: new Date(),
            songs:[]
        }
        try{   
            const pl = new PlayList(playListObject);
            const savedPlayList  = await pl.save();
            return savedPlayList;
        }catch(e){
            console.log('Error in creating a playlist ::', e);
            throw(new Error('Error in creating a playlist'))
        }
    }else{
        console.log('Invalid user session');
        throw new Error('Invalid user session')
    }
}

const checkDuplicateAndGetNewList = async (songsListFromPlayList, song)=>{
    if(!songsListFromPlayList){
        return [null, []];
    }else{
        const songList = await Song.find({_id:{$in:songsListFromPlayList}},{_id:1});
        const hasDuplicate = songList.filter((value)=>value._id.toString() === song._id.toString()).length > 0;
        if(!hasDuplicate){
            const newSongsList = [...songsListFromPlayList, song._id];
            return [null, newSongsList]
        }else{
            return ['the playlist already contains this song']
        }
    }
}

const addSongToPlaylist = async (query, {songId, playlistId}, request) =>{
    let userName;
    const isUserLoggedIn =  await checkUserLoggedIn(request.session);
    try{
        if(isUserLoggedIn){
            userName = _get(request,'session.user.userName');
            const [song] = await Song.find({_id: songId});
            if(!song){
                throw new Error('Invalid Song id.');
            }else{
                let [playList] = await PlayList.find({_id:playlistId, createdBy:userName});
                if(!playList){
                    throw new Error('Invalid Playlist id.')
                }else{
                    const [error, newPlayList] = await checkDuplicateAndGetNewList(playList.songs, song);
                    if(error){
                        throw new Error(error);
                    }else{
                       await PlayList.updateOne({_id:playlistId, createdBy:userName},{songs:newPlayList, lastModified: new Date()});
                       playList = await PlayList.findOne({_id:playlistId});
                    }
                    return playList;
                }
            }
        }else{
            throw new Error('Invalid Session, Please Login to add songs to the playlist')
        }
    }catch(e){
        console.log("caught error in the resolver - add song in playlist resolver :: ", e.message);
        throw new Error(e.message);
    }
}

const deleteSongFromPlayList = async (query, {songId, playlistId}, request)=>{
    let userName;
    const isUserLoggedIn =  await checkUserLoggedIn(request.session);
    try{
        if(isUserLoggedIn){
            userName = _get(request,'session.user.userName');
            const [song] = await Song.find({_id: songId});
            if(!song){
                throw new Error('Invalid Song id')
            }else{
                let [playList] = await PlayList.find({_id:playlistId, createdBy:userName});
                if(!playList){
                    throw new Error('Invalid Playlist id.')
                }else{
                    const deletedSongList = (playList.songs || []).filter((songIdFromPlayList)=> songIdFromPlayList.toString() !== songId);

                    await PlayList.updateOne({_id:playlistId, createdBy:userName},{songs:deletedSongList, lastModified: new Date()});

                    playList = await PlayList.findOne({_id:playlistId});
                }
                return playList;
            }
        }else{
            throw new Error('Invalid Session, Please Login to delete songs to the playlist')
        }

    }catch(e){
        console.log("caught error in the resolver - delete song in playlist  resolver :: ", e.message);
        throw new Error(e.message);
    }
}

module.exports = {songListResolver, playListResolver, createPlayListResolver, addSongToPlaylist, deleteSongFromPlayList}
