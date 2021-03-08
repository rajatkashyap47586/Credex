const mongoose = require('mongoose');

const collectionName = "user";
const userSchema = new mongoose.Schema({
    o_id:{
        type: Number,
        required: true
    },
    u_id:{
        type: Number,
        required: true
    },
    u_name:{
        type:String,
        required: true
    }
});

const userModel = mongoose.model("userModel",userSchema,collectionName);

module.exports = userModel;