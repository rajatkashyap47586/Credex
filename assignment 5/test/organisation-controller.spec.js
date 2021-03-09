const dbConnection = require('../db-connectivity');
const userModel = require('../models/user-model');
const organisationModel = require('../models/organisation-model');
const chai = require('chai');
const should = chai.should();
const app = require('../app');
const chai_http = require('chai-http');
const mongoose = require('mongoose');

chai.use(chai_http);

describe("organisation-controller.spec", () => {

    before((done) => {
        dbConnection();
        done();
    });

    afterEach((done) => {
        userModel.remove({});
        organisationModel.remove({});
        done();
    });

    after((done) => {
        mongoose.connection.close();
        done();
    });

    describe("API testing for organisation", () => {

        it("should add organisation", () => {
            let org = {
                o_id: 1,
                o_name: "Credex"
            }

            return chai.request(app)
                .post("/addorganisation")
                .send(org)
                .then((result) => {
                    result.should.have.status(200);
                    return organisationModel.findOne({ u_id: 1 });
                })
                .then((result) => {
                    result.should.have.status(200);
                    chai.expect(result.u_id).to.equal(1);
                })
                .catch((err) => {
                    return err;
                })
        });

        it("should fetch all organisation data",async()=>{
            let org = new organisationModel({
                o_id:1,
                o_name:"credex"
            })
            await org.save()
            
            return chai.request(app)
                .get("/organisations")
                .then((result)=>{
                    result.should.have.status(200);
                    chai.expect(result.body[0].o_id).to.equal(1);
                })
                .catch((err)=>err);
        });

        it("should fetch particular organisation data",async()=>{
            let org = new organisationModel({
                o_id:1,
                o_name:"Credex"
            });
            await org.save();

            chai.request(app)
                .get("organisation/1")
                .then((result)=>{
                    result.should.have.status(200);
                    chai.expect(result.body.u_id).to.equal(1);
                })
                .catch((err)=>err);
        });

        it("should fetch particular org user data",async()=>{
            let org=new organisationModel({
                o_id:1,
                o_name:"Credex"
            });
            let user = new userModel({
                o_id:1,
                u_id:1,
                u_name:"rajat"
            })
            await org.save();
            await user.save();

            chai.request(app)
                .get("/org/user/1")
                .then((result)=>{
                    result.should.have.status(200);
                    chai.expect(result.body.u_id).to.equal(1);
                })
                .catch((err)=>err);
        });

        it("should update name of organisation",async()=>{
            let org = new organisationModel({
                o_id:1,
                o_name:"credex"
            });
            await org.save();
            
            return chai.request(app)
                .put("/organisation")
                .send({o_id:1,o_name:"google"})
                .then((result)=>{
                    result.should.have.status(200);
                    return organisationModel.findOne({o_id:1});
                })
                .then((result)=>{
                    result.should.have.status(200);
                    chai.expect(result.o_name).to.equal("google");
                })
                .catch((err)=>err);
        }); 

        it("should delete particular organisation data",async()=>{
            let org = new organisationModel({
                o_id:1,
                o_name:"credex"
            });
            await org.save();

            return chai.request(app)
                .delete("/organisation")
                .send({o_id:1})
                .then((result)=>{
                    result.should.have.status(200);
                    return organisationModel.findOne({ o_id: 1 })
                })
                .then((result) => {
                    if (result !== null)
                        should.fail("faied");
                })
                .catch((err) => err);
        });

        it("should delete all organisation data",async()=>{
            let org = new organisationModel({
                o_id:1,
                o_name:"credex"
            })
            await org.save();

            return chai.request(app)
                .delete("/organisations")
                .send({o_id:1})
                .then((result)=>{
                    result.should.have.status(200);
                    return organisationModel.findOne({ o_id: 1 })
                })
                .then((result) => {
                    if (result !== null)
                        should.fail("faied");
                })
                .catch((err) => err);
        });

        it("should delete particular organisation user data",async()=>{
            let org=new organisationModel({
                o_id:1,
                o_name:"Credex"
            });
            let user = new userModel({
                o_id:1,
                u_id:1,
                u_name:"rajat"
            })
            await org.save();
            await user.save();

            return chai.request(app)
                .delete("/org/user")
                .send({o_id:1})
                .then((result)=>{
                    result.should.have.status(200);
                    return userModel.findOne({ o_id: 1 })
                })
                .then((result) => {
                    if (result !== null)
                        should.fail("faied");
                })
                .catch((err) => err);
        });
    })
})