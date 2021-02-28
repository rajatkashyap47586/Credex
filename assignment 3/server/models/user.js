const mongoose = require('mongoose');
const collectionName = "userdata";

const userSchema = new mongoose.Schema({
    sid: {
        type: Number,
        require: true
    },
    username: {
        type: String,
        required: true
    }
});

let user = mongoose.model("user", userSchema, collectionName);

module.exports = user;