const userModel = require('../models/user-model');
const oService = require('../services/organisation-service');
const uService = require('../services/user-service');

const organisationService = new oService();
const userService = new uService();

class organisationController{

    async fetchOraganisationData(req, res) {
        let o = await organisationService.showAllOrganisation();
        res.send(o);
    }

    async fetchParticularOrganisationData(req, res) {
        let o_id = req.params["o_id"];
        let po = await organisationService.showparticularOrganisation(o_id);
        res.send(po);
    }

    async fetchParticularOrgUserData(req, res) {
        let o_id = req.params["o_id"];
        let pou = await organisationService.showParticularOrgUser();
        res.send(pou);
    }

    async addOrganisation(req, res) {
        let o_id = req.body.o_id;
        let o_name = req.body.o_name;
        let result = await organisationService.addOrganisation(o_id, o_name);
        res.send(result);
    }

    async updateOrganisation(req, res) {
        let o_id = req.body.o_id;
        let o_name = req.body.o_name;
        let result = await organisationService.updateOrganisation(o_id, o_name);
        res.send(result);
    }

    async deleteParticularOrgUser(req, res) {
        let o_id = req.body.o_id;
        let result = await organisationService.deleteParticularOrgUser(o_id);
        res.send(result);
    }

    async deleteAllOrganisation(req, res) {
        let result = await organisationService.deleteAllOrganisation();
        res.send(result);
    }

    async deleteParticularOrganisation(req, res) {
        let o_id = req.body.o_id;
        let result = await organisationService.deleteParticularOrg(o_id);
        res.send(result);
    }

}

module.exports = organisationController;