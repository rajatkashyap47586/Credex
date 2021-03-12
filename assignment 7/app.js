const lineReader = require('line-reader');
const prompt = require('prompt');
const connectToDatabase = require('./db-connectivity');
const fs = require('fs');
const userModel = require('./models/userModel');

const schema = {
    properties: {
        fileName: {
            default: "my-file.txt"
        },
        timeToRefresh: {
            default: 15
        }
    }
}

//check if file exist
function checkFileExist(path) {
    return new Promise((resolve, reject) => {
        fs.access(path, fs.F_OK, (err) => {
            if (err)
                return reject(new Error(err));
            else
                return resolve('Exist');
        });
    });
}

function readingAndInsertion(fileName, prevLastLine) {
    console.log("inserting...", prevLastLine);

    return new Promise((resolve, reject) => {
        let myLine=0;
        lineReader.eachLine("./" + fileName, (line, last) => {
            myLine++;
            console.log("myLine",myLine,last,line);
            if (myLine > prevLastLine) {
                console.log("hup");
                let obj = new userModel({
                    name: line.substring(0, line.indexOf(",")),
                    course: line.substring(line.indexOf(",")+2, line.length-1)
                });
                obj.save();
            }
            if (last === true) {
                resolve(myLine);
            }
        });
    });

}

async function prepareReading() {
    prompt.start();
    let result = await prompt.get(schema);
    console.log(result);

    let fileName = result.fileName;
    let timeToRefresh = result.timeToRefresh;
    let isExist;
    let prevLastLine;

    try {
        isExist = await checkFileExist("./" + fileName);
        prevLastLine = 0;
    }
    catch (err) {
        console.log("File not exist", err);
        return;
    }

    if (isExist === "Exist") {
        setInterval(async () => {
            prevLastLine = await readingAndInsertion(fileName, prevLastLine);
            console.log("lastline ", prevLastLine);
            },
            timeToRefresh * 1000
        );
    }
}

async function main() {
    await connectToDatabase();
    prepareReading();
}
main();