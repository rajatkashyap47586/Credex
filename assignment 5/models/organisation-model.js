const mongoose = require('mongoose');

const collectionName = "organisation";

const organisationSchema = new mongoose.Schema({
    o_id:{
        type: Number,
        required: true
    },
    o_name:{
        type:String,
        required: true
    }
});

const organisationModel = mongoose.model("organisationModel",organisationSchema,collectionName);

module.exports = organisationModel;