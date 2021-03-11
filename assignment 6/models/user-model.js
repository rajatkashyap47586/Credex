const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

const userModel = mongoose.model("userModel",userSchema,"user");

module.exports = userModel;