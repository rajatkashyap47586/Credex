const route = require('express').Router();
const getDBInstance = require('./db');

console.log("Routes is executing");
let instance;
getDBInstance()
    .then((result)=>{
        instance = result;
        console.log("route",instance);
    })
    .catch((err)=>{
        console.log("error occured while getting instance in routes "+err);
        return;
    });

module.exports = route;