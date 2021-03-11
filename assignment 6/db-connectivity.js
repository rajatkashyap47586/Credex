const mongoose = require('mongoose');

const DB_URL = "mongodb://localhost:27017/credex6";

async function connectToDatabase() {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connection establish with the database");
    }
    catch (err) {
        console.log("We got an error while connecting to sb ", err);
        return;
    }
}

module.exports = connectToDatabase;