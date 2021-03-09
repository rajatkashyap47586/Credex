const dbConnection = require('../db-connectivity');
const chai =require('chai');
const mongoose = require('mongoose');

describe("db-connection.spec",()=>{
    it("Should connect to database", async()=>{
        await dbConnection();
        chai.expect(mongoose.connection.states[1]).to.equal("connected");
    })
})