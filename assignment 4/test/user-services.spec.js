//1 testing case
const Service = require('../services/user-service');
const db = require('../dbConnectivity');
const userModel = require('../models/userModel');
const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = require('chai');
const should = chai.should();
const assert = chai.assert;

const UserService = new Service();
describe("user-services.spec", () => {
    describe("Services testing", () => {

        before((done) => {
            db();
            userModel.remove({}, done);
        })

        afterEach((done)=>{
            userModel.remove({}, done);
        })

        after((done) => {
            mongoose.connection.close();
            done();
        })

        it("should add user to db", async () => {
            let id = 1;
            let name = "Shubham";
            await UserService.addUser(id, name);
            return userModel.findOne({id:1})
                .then((result)=>{
                    if(result.id!==1)
                        should.fail("failed");
                })
            
        })

        it("should fetch all user data from db",async ()=>{
            await (new userModel({id:1, name:"shubham"})).save();
            return UserService.userList()
                .then((result)=>{
                    if(result[0].id!==1)
                        should.fail("failed");
                })
        })

        it("should fetch particular user data from db",async ()=>{
            await (new userModel({id:1, name:"shubham"})).save();
            return UserService.showUser(1)
                .then((result)=>{
                    if(result.id!==1)
                        should.fail("failed");
                })
        })

        it("should delete user from db", async ()=>{
            await (new userModel({id:1, name:"shubham"})).save();
            return UserService.deleteUser(1)
                .then((res)=>{
                    return userModel.findOne({id:1});
                })
                .then((res)=>{
                    if(res!==null)
                        should.fail("failed");

                })
        })
    })
})