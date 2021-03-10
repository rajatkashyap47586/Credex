const uService = require('../services/user-service');
const oService = require('../services/organisation-service');

const userService = new uService();
const organisationService = new oService();

class userController {

    //
    /*async fetchAllData(req, res) {
        let u = await userService.showAllUser();
        let o = await organisationService.showAllOrganisation();
        res.send({ user: u, organisation: o });
    }*/

    async fetchUserData(req, res) {
        let u = await userService.showAllUser();
        res.send(u);
    }

    async fetchParticularUserData(req, res) {
        let u_id = req.params["u_id"];
        let pu = await userService.showParticularUser(u_id);
        res.send(pu);
    }

    async addUser(req, res) {
        let o_id = req.body.o_id;
        let u_id = req.body.u_id;
        let u_name = req.body.u_name;
        let result = userService.addUser(o_id, u_id, u_name);
        res.send(result);
    }

    async updateUser(req, res) {
        let u_id = req.body.u_id;
        let u_name = req.body.u_name;
        let result = await userService.updateUser(u_id, u_name);
        res.send(result);
    }

    async deleteAllUser(req, res) {
        let result = await userService.deleteAllUser();
        res.send(result);
    }

    async deleteParticularUser(req, res) {
        let u_id = req.body.u_id;
        let result = await userService.deleteParticularUser(u_id);
        res.send(result);
    }

}

module.exports = userController