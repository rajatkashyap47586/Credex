const mongoose = require('mongoose');
const DB_URL = "mongodb://localhost:27017/credex"

const additionalParam = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

async function connectToDatabase() {
    try {
        await mongoose.connect(DB_URL, additionalParam);
        console.log("database connection is established");
    }
    catch (err) {
        console.log("We got an error while trying to connect to db ", err);
    }
}

module.exports = connectToDatabase;