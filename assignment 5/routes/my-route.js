const route = require('express').Router();

const Controller = require('../controller/user-controller');
const userService = require('../services/user-service');

const userController = new Controller();

route.get("/",userController.fetchAllData);

route.get("/users",userController.fetchUserData);

route.get("/orgaisations",userController.fetchOraganisationData);

//not working
route.get("/user/:u_id",userController.fetchParticularUserData,()=>{
    console.log("Its me");
});
//
route.get("organisation/:o_id",userController.fetchParticularOrganisationData);
//
route.get("/org/user/:o_id",userController.fetchParticularOrgUserData);

route.post("/adduser",userController.addUser);

route.post("/addorganisation",userController.addOrganisation);


route.put("/organisation",userController.updateOrganisation);

route.put("/user",userController.updateUser);


route.delete("/organisation",userController.deleteParticularOrganisation);

route.delete("/user",userController.deleteParticularUser);

route.delete("/organisations",userController.deleteAllOrganisation);

route.delete("/users",userController.deleteAllUser);

route.delete("/org/user",userController.deleteParticularOrgUser)


module.exports = route;