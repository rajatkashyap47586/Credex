const dbConnection = require('../db-connectivity');
const userModel = require('../models/user-model');
const organisationModel = require('../models/organisation-model');
const chai = require('chai');
const should = chai.should();
const app = require('../app');
const mongoose = require('mongoose');
const chai_http = require("chai-http");

chai.use(chai_http);

describe("api.spec",()=>{

    before((done)=>{
        dbConnection();
        done();
    });

    afterEach((done)=>{
        userModel.remove({});
        organisationModel.remove({});
        done();
    })

    after((done)=>{
        mongoose.connection.close();
    })

    describe("API testing for user",()=>{
        it("should add user in user collection", ()=>{
            let user = {
                o_id:1,
                u_id:1,
                u_name:"Rajat",
            }
            return chai.request(app)
            .post("/adduser")
            .send(user)
                .then((result)=>{
                    result.should.have.status(200);
                    return userModel.findOne({u_id:1});
                })
                .then((result)=>{
                    chai.expect(result.u_id).to.equal(1)
                })
                .catch((err)=>{
                    return err;
                })
        });

        it("should fetch all user collection data",async()=>{
            let user = new userModel({
                o_id:1,
                u_id:1,
                u_name:"rajat",
            })
            await user.save();

            return chai.request(app)
                .get("users")
                .then((result)=>{
                    result.should.have.status(200);
                    chai.expect(result.body[0].u_id).to.equal(1);
                })
                .catch((err)=>err);
        })

        it("should fetch particular user data",async()=>{
            let user = new userModel({
                o_id:1,
                u_id:1,
                u_name:"rajat",
            })

            await user.save();

            return chai.request(app)
                .get("/user/1")
                .then((result)=>{
                    result.should.have.status(200);
                    chai.expect(result.body.u_id).to.equal(1);
                })
                .catch((err)=>err);
        })

        it("should update name of user",async()=>{
            let user = new userModel({
                o_id:1,
                u_id:1,
                u_name:"sachin"
            });
            await user.save();
            
            return chai.request(app)
                .put("/user")
                .send({u_id:1,u_name:"rajat"})
                .then((result)=>{
                    result.should.have.status(200);
                    return organisationModel.findOne({u_id:1});
                })
                .then((result)=>{
                    result.should.have.status(200);
                    chai.expect(result.u_name).to.equal("rajat");
                })
                .catch((err)=>err);
        }); 

        it("should delete particular user data",async()=>{
            let user = new userModel({
                o_id:1,
                u_id:1,
                u_name:"sachin"
            });
            await user.save();

            return chai.request(app)
                .delete("/user")
                .send({u_id:1})
                .then((result)=>{
                    result.should.have.status(200);
                    return userModel.findOne({ u_id: 1 })
                })
                .then((result) => {
                    if (result !== null)
                        should.fail("faied");
                })
                .catch((err) => err);
        });

        it("should delete all user data",async()=>{
            let user = new userModel({
                o_id:1,
                u_id:1,
                u_name:"sachin"
            });
            await user.save();

            return chai.request(app)
                .delete("/users")
                .send({u_id:1})
                .then((result)=>{
                    result.should.have.status(200);
                    return organisationModel.findOne({ u_id: 1 })
                })
                .then((result) => {
                    if (result !== null)
                        should.fail("faied");
                })
                .catch((err) => err);
        });
    })
})