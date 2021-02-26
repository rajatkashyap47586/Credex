const express = require('express');
const routes = express.Router();
const MongoClient = require('mongodb').MongoClient;
const DBURL = encodeURI("mongodb://localhost:27017/");
const DBNAME = "credex-assignment1";
const db= require('./db');

function getTemp(){
    db((instance)=>{
    console.log("route",instance);
});

}
getTemp();


console.log("Routes module executing...");
let dbInstance;

function connectToDatabase() {
    try {
        MongoClient.connect(DBURL, { useNewUrlParser: true },
            { useUnifiedTopology: true }, (err, client) => {
                console.log("trying to connect to DB");

                dbInstance = client.db(DBNAME);
                console.log("Connected to " + DBNAME + " database");
                return dbInstance;
            });
    }
    catch (err) {
        console.log("Error occured while connecting to db " + err);
    }
}
connectToDatabase();

routes.get("/", (req, res, next) => {

    dbInstance.collection("userdata").find({}).toArray(function (err, result) {
        if (err) {
            res.send(err);
            next();
        }
        else {
            res.send(result);
            next();
        }
    });
});

routes.post("/", (req, res, next) => {
    let obj={
        sid: req.query.sid,
        name: req.query.name
    }
    dbInstance.collection("userdata").insertOne(obj,(err,result)=>{
        if(err){
            res.send(err);
            next();
        }
        else{
            res.send("1 document inserted");
            next();
        }
    })
});

routes.put("/", (req, res, next) => {
    let sid=req.query.sid;
    let name=req.query.name;
    let condn={sid: sid};
    let newValue ={ $set: {name: name}};
    dbInstance.collection("userdata").updateOne(condn, newValue, (err,result)=>{
        if(err)
        {
            res.send(err);
            next();
        }
        else{
            res.send("1 document updated");
            next();
        }
    });
});

routes.delete("/", (req, res, next) => {
    let obj={sid:req.query.sid};
    dbInstance.collection("userdata").deleteOne(obj,(err,result)=>{
        if(err)
        {
            res.send(err);
            next();
        }
        else{
            res.send("1 document is deleted");
            next();
        }
    })
});

module.exports = routes;