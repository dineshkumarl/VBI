const Song =  require('../../../songs/models')
const songListResolver = async (playlist)=>{
    try{
       const songListInDB = await Song.find({_id: {$in:playlist.songs}},{_id:0});
       return songListInDB;
    }catch(e){

    }
}

module.exports = {songListResolver}
