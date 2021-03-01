const mongoose = require('mongoose');
const collectionName = "userdata";

const userSchema = new mongoose.Schema({
    rollno:{
        type: Number,
        require: true
    },

    name:{
        type: String,
        require: true
    }
});


const userModel = mongoose.model("userModel", userSchema, collectionName);

module.exports = userModel;