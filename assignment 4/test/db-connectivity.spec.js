//1 testing case
const connectToDatabase = require('../dbConnectivity');
const mongoose = require('mongoose');
const chai =require('chai');
const { expect } = require('chai');

describe("db-connectivity.spec",()=>{
    
    after((done)=>{
        mongoose.connection.close();
        done();
    })

    it("Should connect to Database",async ()=>{
            await connectToDatabase();
            console.log("ans==",mongoose.connection.states[1]);
            chai.expect(mongoose.connection.states[1]).to.equal("connected");
    })
})