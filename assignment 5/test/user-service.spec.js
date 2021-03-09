const chai = require('chai');
const mongoose = require('mongoose');
const dbConnection = require('../db-connectivity');
const userModel = require('../models/user-model');
const organisationModel = require('../models/organisation-model');
const uService = require('../services/user-service');
const should  = chai.should()

const userService = new uService();

describe("user-service.spec", () => {
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

        after((done) => {
            mongoose.connection.close();
            done();
        })

        it("should add user into user collection", async () => {
            await userService.addUser(1, 1, "rajat")

            return userModel.findOne({ u_id: 1 })
                .then((result) => {
                    if (result.id !== 1)
                        should.fail("failed");
                })
                .catch((err)=>err);
        })

        it("should show all user",async()=>{
            let user = new userModel({
                o_id:1,
                u_id:1,
                u_name:"rajat"
            });

            await user.save();

            return userService.showAllUser()
                .then((result)=>{
                    if(result[0].u_id!==1)
                        should.fail("failed");
                })
                .catch((err)=>err);
        });

        it("should particular user",async()=>{
            await new userModel({o_id:1, u_id:1, u_name:"rajat"});

            return userService.showParticularUser(1)
                .then((result)=>{
                   if(result.u_id!==1)
                        should.fail("failed");
                })
                .catch((err)=>err);
        })

        it("should delete all user",async()=>{
            await new userModel({o_id:1, u_id:1, u_name:"rajat"});

            return userService.deleteAllUser()
                .then((result)=>{
                    return userModel.findOne({u_id:1});
                })
                .then((result)=>{
                   if(result!==null)
                        should.fail("failed");
                })
                .catch((err)=>err);
        });

        it("should delete particular user",async()=>{
            await new userModel({o_id:1, u_id:1, u_name:"rajat"});

            return userService.deleteParticularUser(1)
                .then((result)=>{
                    return userModel.findOne({u_id:1});
                })
                .then((result)=>{
                    if(result!==null)
                        should.fail("failed");
                })
                .catch((err)=>err);
        });

        it("should update user in user collection",async()=>{
            await new userModel({o_id:1, u_id:1, u_name:"rajat"}).save();

            return userService.updateUser(1,"sachin")
                .then((result)=>{
                    return userModel.findOne({u_id:1});
                })
                .then((result)=>{
                    if(result.u_name!=="sachin")
                        should.fail("failed");
                })
        })
    })
})