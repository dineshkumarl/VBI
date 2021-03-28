const PlayList = require('../../../playlists/models')
const playListResolver = async (query,_1,request)=>{
    try {
        const playlistInDB = await PlayList.find({},{_id:0});
        return playlistInDB;
    }catch(e){
        console.log("caught error in the playlist resolver :: ", e);
    }
}

module.exports = {
    playListResolver
}