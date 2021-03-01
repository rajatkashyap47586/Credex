const express = require('express');
const bodyparser= require('body-parser');
const app = express();
const route = require('./routes');
const PORT = "1234";
const connectToDatabase = require('./dbConnectivity');


app.use(bodyparser.urlencoded({extended : true }), bodyparser.json());
app.use(route);
connectToDatabase();

app.listen(PORT, (err) => {
    if (err) {
        console.log("error occured while starting express server at port ", PORT);
        return;
    }
    else {
        console.log("Server started at port ", PORT);
    }
})