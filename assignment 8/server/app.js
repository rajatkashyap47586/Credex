const app = require('express')();
const route = require('./routes.js');
const connectToDatabase = require('./db-connection');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(route);

connectToDatabase();

app.listen("1234",(err)=>{
    if(err)
    {
        console.log("error while starting the server ",err);
        return;
    }
    console.log("server started.");
});