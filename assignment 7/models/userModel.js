const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    course:{
        type:String,
        required: true
    }
});

module.exports = mongoose.model("userModel",userSchema,"user");