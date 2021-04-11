const mongoose = require('mongoose');

const albumSchema = mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    description:{
        type: String
    },
    songs:{
        type: Array
    }
})

module.exports = mongoose.model("Albums", albumSchema);
