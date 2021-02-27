
const mongoClient = require('mongodb').MongoClient;
const DBURL = encodeURI("mongodb://localhost:27017/");
const DBNAME = "credex-assignment1";

let totalInstance = 0;
let instance;

function connectToDatabase() {
    return new Promise((resolve, reject) => {
        mongoClient.connect(DBURL, { useNewUrlParser: true },
            { useUnifiedTopology: true }, (err, client) => {
                if (err) {
                    console.log("error occured while connecting to database");
                    reject(new Error("Database Connection error Occured"));
                }
                else {
                    console.log("Creating new Connection instance of db");
                    let instance = client.db(DBNAME);
                    resolve(instance);
                }

            })
    })

}

function getInstance() {
    console.log("Serving your getting instance request");
    if (totalInstance !== 0) {
        console.log("Instance already created. Returninn that...");
        return new Promise((resolve, reject) => resolve(instance));
    }
    else {
        totalInstance++;
        return new Promise((resolve, reject) => {
            connectToDatabase()
                .then((result) => {
                    instance = result;
                    console.log("returning new instance");
                    resolve(instance);
                })
                .catch((err) => {
                    console.log("Error occured while creating the instance " + err);
                })

        });
    }
}

    module.exports = getInstance;