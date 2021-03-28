const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
    id:{
        type: Number,
        required:true
    },
    title:{
        type: String,
        required:true
    },
    singers:{
        type:Array
    },
    albumId:{
        type: mongoose.Types.ObjectId
    }
})

module.exports = mongoose.model("Song", songSchema);
