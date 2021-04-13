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
    },
    duration:{
        h:{
            type:String
        },
        m:{
            type:String
        },
        s:{
            type:String
        }
    }
})

module.exports = mongoose.model("Songs", songSchema);
