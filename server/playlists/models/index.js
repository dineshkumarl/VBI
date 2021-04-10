const mongoose = require('mongoose');

const playListSchema = mongoose.Schema({
    id:{
        type: Number,
        required:true
    },
    createdBy:{
        type: String,
        required:true
    },
    name:{
        type: String,
        required:true
    },
    created:{
        type:Date
    },
    lastModified:{
        type: Date
    },
    songs:{
        type:Array
    }
})

module.exports = mongoose.model("PlayList", playListSchema);