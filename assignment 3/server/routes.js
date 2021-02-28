const route = require('express').Router();
const db = require("./db");
const user = require('./models/user');
let dbInstance;

(async () => {
    dbInstance = await db();
    //console.log("I got the instace in route",dbInstance);
})();

route.get("/", (req, res, next) => {
    console.log("serving get request");
    user.find({})
        .then((result) => {
            res.send({
                status: 200,
                message: "success",
                data: result
            })
            next();
        })
        .catch((err) => {
            console.log("Error occured while fetching the data from db" + err);
            res.send({
                status: 500,
                message: "failed",
                error: err
            })
            next();
        })
})

route.post("/", (req, res, next) => {
    console.log("serving post request");
    console.log(req.query.sid);
    let obj = new user({
        sid: req.query.sid,
        username: req.query.un
    })
    obj.save()
        .then((result) => {
            res.send({
                status: 200,
                message: "success",
                data: result
            })
            next();
        })
        .catch((err) => {
            res.send({
                status: 500,
                messsage: "Error occured while saving the data in db",
                data: err
            });
            next();
        })

})

route.put("/", (req, res, next) => {
    console.log("serving put request");
    let condn={
        sid: req.query.sid
    }
    let obj ={
        username: req.query.un
    }
    user.findOneAndUpdate(condn, obj, {new:true})
        .then((result)=>{
            res.send({
                status: 200,
                message: "success",
                data: result
            })
            next();
        })
        .catch((err)=>{
            res.send({
                status: 500,
                message: "failed",
                data: err
            })
            next();
        })
})

route.delete("/", (req, res, next) => {
    console.log("serving delete request");
    let condn = {
        sid: req.query.sid
    }
    user.deleteOne(condn)
        .then((result)=>{
            res.send({
                status: 200,
                message: "success",
                data: result
            })
            next();
        })
        .catch((err)=>{
            res.send({
                status: 500,
                message: "failed",
                data: err
            })
        next();
        })
})



module.exports = route;