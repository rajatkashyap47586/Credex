const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    gmail:{
        type:String,
        required: true
    },
    name:{
        type:String,
        required: true
    }
});

const userModel = mongoose.model("userModel",userSchema,"user");

module.exports = userModel;