const mongoose = require('mongoose');

const singerSchema = mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    bio:{
        type: String
    }
})

module.exports = mongoose.model("Singers", singerSchema);
