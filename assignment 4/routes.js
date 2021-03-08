const route = require('express').Router();
const Controller = require('./controllers/userController');

const userController = new Controller();

route.get('/userlist', userController.userList);

route.get('/user/:id', userController.showUser);

route.post('/adduser', userController.addUser);

route.delete('/deluser/:id', userController.deleteUser);

module.exports = route;
