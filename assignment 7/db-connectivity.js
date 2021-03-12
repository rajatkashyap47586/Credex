const mongoose = require('mongoose');

const DB_URL = "mongodb://localhost:27017/credex6";
const ADDITIONAL_PARAMETER={
    useNewUrlParser: true,
    useUnifiedTopology: true
};

function connectToDatabase(){
    try{
        mongoose.connect(DB_URL,ADDITIONAL_PARAMETER);
    }
    catch(err)
    {
        console.log("we got an error while connecting to db");
        return;
    }
}

module.exports = connectToDatabase;