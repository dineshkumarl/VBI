const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
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

module.exports = mongoose.model("Songs", songSchema);
