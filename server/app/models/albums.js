const mongoose = require('mongoose');

const albumSchema = mongoose.Schema({
    id:{
        type: Number,
        required:true
    },
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

module.exports = mongoose.model("Album", albumSchema);
