const express = require('express');
const routes = express.Router();

const db = require('./db');

console.log("Routes module executing...");

let dbInstance;
function giveInstance() {
    db((instance) => {
        dbInstance = instance;
    });
}

giveInstance();

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
    let obj = {
        sid: req.query.sid,
        name: req.query.name
    }
    dbInstance.collection("userdata").insertOne(obj, (err, result) => {
        if (err) {
            res.send(err);
            next();
        }
        else {
            res.send("1 document inserted");
            next();
        }
    })
});

routes.put("/", (req, res, next) => {
    let sid = req.query.sid;
    let name = req.query.name;
    let condn = { sid: sid };
    let newValue = { $set: { name: name } };
    dbInstance.collection("userdata").updateOne(condn, newValue, (err, result) => {
        if (err) {
            res.send(err);
            next();
        }
        else {
            res.send("1 document updated");
            next();
        }
    });
});

routes.delete("/", (req, res, next) => {
    let obj = { sid: req.query.sid };
    dbInstance.collection("userdata").deleteOne(obj, (err, result) => {
        if (err) {
            res.send(err);
            next();
        }
        else {
            res.send("1 document is deleted");
            next();
        }
    })
});

module.exports = routes;