const Song = require('../../models');
const Album = require('../../../app/models/albums');
const Singer = require('../../../app/models/singers');
const songListResolver = async (song, args)=>{
    const titleRegEx = new RegExp(`^${args.title}`,'i');
    try {
        const songsInDB = await Song.find({title:titleRegEx},{_id:0});
        return songsInDB;
    }catch(e){
        console.log("caught error in the songlist resolver :: ", e);
    }
}

const albumResolver = async (song)=>{
    try{
        const album = await Album.findOne({_id:song.albumId}, {_id:0});
        return album;
    }catch(e){
        console.log("caught error in the song.album resolver :: ", e);
    }
}

const singersResolver = async (song)=>{
    try{
        const singers = await Singer.find({_id:{$in:song.singers || [] }},{_id:0, id:0});
        return singers;
    }catch(e){
        console.log("caught error in the song.singers resolver :: ", e);
    }
}

module.exports = {
    songListResolver,
    albumResolver,
    singersResolver
}
