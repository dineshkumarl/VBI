const mongoose = require('mongoose');

const playListSchema = mongoose.Schema({
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

module.exports = mongoose.model("PlayLists", playListSchema);