const lineReader = require('line-reader');
const dbConnection = require('./db-connectivity');
const userModel = require('./models/user-model');

dbConnection();

async function insertIntoDB() {
    await userModel.remove({});
    lineReader.eachLine("./my-file.text", (line, last) => {
        let obj = new userModel({
            userName: line.substring(0,line.indexOf(" ")),
            password: line.substring(line.indexOf(" ")+1,line.length)
        })
        obj.save();
    });
}

insertIntoDB();
