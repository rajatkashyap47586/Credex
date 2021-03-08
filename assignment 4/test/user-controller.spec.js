// 4 testing case
const chai = require('chai');
const mongoose = require('mongoose');
const dbConnectivity = require('../dbConnectivity');
const userModel = require('../models/userModel');

const chai_http = require('chai-http')
const server = require('../app');
const should = chai.should();

chai.use(chai_http);

const DB_URL = "mongodb://localhost:27017/credex"

const additionalParam = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

describe('user-controller.spec.js', (done) => {
    describe("API testing", () => {

        before((done) => {
            console.log("clearing database")
            dbConnectivity();
            userModel.remove({}, done);
        });

        after((done) => {
            mongoose.connection.close();
            done();
        })

        afterEach((done) => {
            userModel.remove({}, done);
        })

        it("it should add user", () => {
            return chai.request(server)
                .post('/adduser')
                .send({
                    id: 1,
                    name: "raghav"
                })
                .then((res) => {
                    //assertion
                    res.should.have.status(200);
                    return userModel.findOne({ id: 1 });

                })
                .then((res) => { chai.expect(res.id).to.equal(1) })
                .catch((err => { throw err }));
        });

        it("it should fetch all data", async () => {
            let user = new userModel({
                id: 1,
                name: "raghav"
            });
            await user.save();

            return chai.request(server)
                .get('/userlist')
                .then((res) => {
                    res.should.have.status(200);
                    chai.expect(res.body[0].id).to.equal(1);
                })
                .catch((err) => {
                    throw err;
                })
        });

        it("it should fetch particular user data", async () => {
            let user = new userModel({
                id: 1,
                name: "raghav"
            });
            await user.save();
            return chai.request(server)
                .get('/user/1')
                .then((res) => {
                    chai.expect(res.body.id).to.equal(1);
                })
                .catch((err) => { throw err })
        });


        it("it should delete user", async () => {
            let user = new userModel({
                id: 1,
                name: "raghav"
            });
            await user.save();
            return chai.request(server)
                .delete('/deluser/1')
                .then((res) => {
                    return userModel.findOne({ id: 1 })
                })
                .then((res) => {
                    if (res !== null)
                        should.fail("faied");
                })
                .catch((err) => { throw err })
        });

    });;
});