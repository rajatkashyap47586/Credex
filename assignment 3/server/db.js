const mongoose = require('mongoose');

const DBURL ="mongodb://localhost:27017/credex-assignment1";

let totalInstance = 0;
let instance;

async function createDBInstance() {
    console.log("Trying to creating a new instance");
    try {
        instance = await mongoose.connect(DBURL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            return instance;
    }
    catch (err) {
        console.log("We got an error while creating a new instance " + err);
        return;
    }
}

async function getDBInstance() {
    if (totalInstance !== 0) {
        console.log("We already have an instance returning that one");
        return instance;
    }
    else {
        try {
            totalInstance++;
            instance = await createDBInstance();
            console.log("Successfully create the new instance");

            return instance;
        }
        catch (err) {
            console.log("error occured while creating and getting instance");
            return;
        }
    }
}

module.exports = getDBInstance;