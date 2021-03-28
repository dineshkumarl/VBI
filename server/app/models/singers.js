const mongoose = require('mongoose');

const singerSchema = mongoose.Schema({
    id:{
        type: Number,
        required:true
    },
    name:{
        type: String,
        required:true
    },
    bio:{
        type: String
    }
})

module.exports = mongoose.model("Singer", singerSchema);
