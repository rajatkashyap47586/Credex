const route = require('express').Router();

const uController = require('../controller/user-controller');
const oController = require('../controller/organisation-controller');


const userController = new uController();
const organisationController = new oController();

route.get("/",userController.fetchAllData);

route.get("/users",userController.fetchUserData);

route.get("/organisations",organisationController.fetchOraganisationData);

//not working
route.get("/user/:u_id",userController.fetchParticularUserData);
//
route.get("/organisation/:o_id",organisationController.fetchParticularOrganisationData);
//
route.get("/org/user/:o_id",organisationController.fetchParticularOrgUserData);


route.post("/adduser",userController.addUser);

route.post("/addorganisation",organisationController.addOrganisation);


route.put("/organisation",organisationController.updateOrganisation);

route.put("/user",userController.updateUser);


route.delete("/organisation",organisationController.deleteParticularOrganisation);

route.delete("/user",userController.deleteParticularUser);

route.delete("/organisations",organisationController.deleteAllOrganisation);

route.delete("/users",userController.deleteAllUser);

route.delete("/org/user",organisationController.deleteParticularOrgUser)


module.exports = route;