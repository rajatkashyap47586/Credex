const mongoose = require('mongoose');
const userModel = require('../models/user-model');
const lineReader = require('line-reader');

let count = 0;
let prevLastLine = 0;

class userService {

    async fetchData() {
        let result = await userModel.find({});
        return result;
    }

    updateCount(countTemp) {
        let result;
        if (count < countTemp) {
            result = countTemp - count;
            count = countTemp;
        }
        else {
            result = 0;
        }
        return result;
    }

    getStatus(data, changeInNumber){
        let temp= [];
        for(let i=data.length-changeInNumber; i<data.length;i++)
        {
            temp.push(data[i]);
        }
        return {
            newlyAddedData: temp,
            numberOfUpdatedRecord: changeInNumber
        };
    }   

    //not use async and await ? performance and control ?
    async addDataInDatabase(gmail, name) {
        let user = new userModel({
            gmail: gmail,
            name: name
        });
        await user.save();
    }

    checkFileForUpdation(fileName) {
        console.log("inserting...", prevLastLine);

        return new Promise((resolve, reject) => {
            let myLine = 0;
            lineReader.eachLine("./" + fileName, (line, last) => {
                console.log("line",line);
                myLine++;
                console.log("myLine", myLine, last, line);
                if (myLine > prevLastLine) {
                    console.log("hup");
                    let gmail = line.substring(0, line.indexOf(","));
                    let name = line.substring(line.indexOf(",") + 2, line.length - 1);
                    this.addDataInDatabase(gmail, name);
                }
                if (last === true) {
                    resolve(myLine);
                }
            });
        });

    }

    async prepareReadingFile() {
        let fileName = "my-file.txt";

        prevLastLine = await this.checkFileForUpdation(fileName);
        console.log("lastline ", prevLastLine);
    }
}

module.exports = userService;