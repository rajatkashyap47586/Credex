const express =require('express');
const app = express();
const routes = require('./routes/my-route')
const dbConnection = require('./db-connectivity');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(routes);

dbConnection();

app.listen("1234",(err)=>{
    if(err){
        console.log("error occured while starting the server",err);
        return;
    }
    console.log("Server started at port 1234");
})