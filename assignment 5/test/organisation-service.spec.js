const chai = require('chai');
const mongoose = require('mongoose');
const dbConnection = require('../db-Connectivity');
const userModel = require('../models/user-model');
const organisationModel = require('../models/organisation-model');
const oService = require('../services/organisation-service');
const should = chai.should()

const organisationService = new oService();

describe("organisation-service.spec", () => {
    describe("Services Testing", () => {

        before((done) => {
            dbConnection();
            done();
        })

        afterEach((done) => {
            organisationModel.remove({});
            userModel.remove({});
            done();
        })

        after((done)=>{
            mongoose.connection.close();
            done();
        })

        it("should add organisation",()=>{
            return organisationService.addOrganisation(1,"Google")
                .then((result)=>{
                    return organisationModel.findOne({o_id:1});
                })
                .then((result)=>{
                    if(result.o_name!=="Google")
                        should.fail("failed");
                })
                .catch((err)=>err);
        });

        //******************** 
        it("should show all org",async()=>{
            await new organisationModel({o_id:1,o_name:"google"}).save();

            return organisationService.showAllOrganisation()
                .then((result)=>{
                    console.log("r",result);
                    if(result[0].o_id!==1)
                        should.fail("failed");
                })
                .catch((err)=>err);
        });

        it("should fetch particular org data",async()=>{
            
            await new organisationModel({o_id:1,o_name:"google"}).save();
            return organisationService.showParticularOrgUser(1)
                .then((result)=>{
                    if(result.o_id!==1)
                        should.fail("failed");
                })
                .catch((err)=>err);
        });

        it("should fetch particular org user data",async()=>{
            await new organisationModel({
                o_id:1,
                o_name:"Google"
            }).save();

            await new userModel({o_id:1, u_id:1, u_name:"rajat"}).save();

            return organisationService.showParticularOrgUser(1)
                .then((result)=>{
                    if(result[0].u_id!==1)
                        should.fail("failed");
                })
                .catch((err)=>err);
        });

        it("should delete all organisation",async()=>{
            await new organisationModel({
                o_id:1,
                o_name:"Google"
            }).save();

            return organisationService.deleteAllOrganisation()
                .then((result)=>{
                    return organisationModel.findOne({o_id:1});
                })
                .then((result)=>{
                    if(result.o_id!==null)
                        should.fail("failed");
                })
                .catch((err)=>err);
        });

        it("should delete particular org",async()=>{
            await new organisationModel({
                o_id:1,
                o_name:"Google"
            }).save();

            return organisationService.deleteParticularOrg(1)
                .then((result)=>{
                    return organisationModel.findOne({o_id:1});
                })
                .then((result)=>{
                    if(result!==null)
                        should.fail("failed");
                })
                .catch((err)=>err);
        });

        it("should delete particular org user data",async()=>{
            await new organisationModel({
                o_id:1,
                o_name:"Google"
            }).save();

            await new userModel({o_id:1, u_id:1, u_name:"rajat"}).save();

            return organisationService.deleteParticularOrgUser(1)
                .then((result)=>{
                    return userModel.findOne({u_id:1});
                })
                .then((result)=>{
                    if(result!==null)
                        should.fail('failed');
                })
                .catch((err)=>err);
        });
        
        it("should update name of organisation",async()=>{
            await new organisationModel({
                o_id:1,
                o_name:"Google"
            }).save();

            return organisationService.updateOrganisation(1,"Credex")
                .then((result)=>{
                    return organisationModel.findOne({o_id:1});
                })
                .then((result)=>{
                    if(result.o_name!=="Google")
                        should.fail("failed");
                })
                .catch((err)=>err);
        })

    })
})