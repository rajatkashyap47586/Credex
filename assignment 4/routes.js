const route = require('express').Router();
const Controller = require('./controllers/userController');

const userController = new Controller();

route.get('/userlist', (req, res, next) => {
    console.log("serving get userlist request");
    userController.userList()
        .then((result) => {
            res.json(result);
            next();
        })
        .catch((err) => {
            res.json(err);
            next();
        });
});

route.get('/user/:rollno', (req, res, next) => {
    console.log("serving get id request");
    userController.listUser(req.params["rollno"])
        .then((result) => {
            res.json(result);
            next();
        })
        .catch((err) => {
            res.json(err);
            next();
        });
});

route.post('/adduser', (req, res, next) => {
    console.log("serving post adduser request");
    let user = {
        rollno: req.body.rollno,
        name: req.body.name
    }
    userController.addUser(user)
        .then((result) => {
            res.json(result);
            next();
        })
        .catch((err) => {
            res.json(err);
            next();
        });
})

route.delete('/deleteuser/:rollno', (req, res, next) => {
    console.log("serving delete request");
    userController.deleteUser(req.params["rollno"])
        .then((result) => {
            res.json(result);
            next();
        })
        .catch((err) => {
            res.json(err);
            next();
        });

})

module.exports = route;
