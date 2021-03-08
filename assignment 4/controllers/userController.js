const Service = require('../services/user-service');

const UserService = new Service(); 

class UserController {

    //show all the user data Controller
    async userList(req,res) {
        let result = await UserService.userList(); 
        res.json(result);
    }

    //show specified user data Controller
    async showUser(req,res) {
        let id = req.params["id"];
        let result = await UserService.showUser(id);
        res.json(result);
    }

    //add the user Controller
    async addUser(req,res) {
        let id = req.body.id;
        let name = req.body.name;
        let result = await UserService.addUser(id, name);
        res.json(result);
    }

    //delete the user Controller
    async deleteUser(req,res) {
        console.log(req.params["id"]);
        let id = req.params["id"];
        let result = await UserService.deleteUser(id);
        res.json(result);
    }
}

module.exports = UserController;