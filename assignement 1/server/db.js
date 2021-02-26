const MongoClient = require('mongodb').MongoClient;
const DBURL = encodeURI("mongodb://localhost:27017/");
const DBNAME = "credex-assignment1";

let totalInstance = 0;
let instance;

function connectToDatabase(cb) {
    try {
        MongoClient.connect(DBURL, { useNewUrlParser: true },
            { useUnifiedTopology: true }, (err,client) => {
                console.log("trying to connect to DB");

                let instance = client.db(DBNAME);
                console.log("Connected to " + DBNAME + " database");
                cb(instance);
            });
    }
    catch (err) {
        console.log("Error occured while connecting to db " + err);
    }
}
function getDBInstance(cb) {
    console.log("total instance till now =" + totalInstance);
    try {
        if (totalInstance !== 0) {
            console.log("returning old db instance");
            cb(instance);
        }
        else {
            console.log("else");
            totalInstance++;
            connectToDatabase((inst)=>{
                instance = inst;
                cb(instance);
            });
        }
    }
    catch (err) {
        console.log("Error while checking instance and making instance " + err);
    }
}

module.exports = getDBInstance;