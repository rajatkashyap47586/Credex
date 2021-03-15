const route = require('express').Router();
const uController =require('./controller/user-controller');

const userController = new uController();

route.get("/user/status",userController.fetchStatus);

module.exports = route;