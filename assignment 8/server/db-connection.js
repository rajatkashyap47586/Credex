const mongoose = require('mongoose');
const DB_URL = "mongodb://localhost:27017/credex8"

const additionalParam = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

async function connectToDatabase(){
    try{
    await mongoose.connect(DB_URL, additionalParam);
    }
    catch(err){
        console.log("error while connecting to database",err);
        return err;
    }

}

module.exports = connectToDatabase;