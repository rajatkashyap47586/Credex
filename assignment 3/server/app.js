const express = require('express');
const app = express();
const route = require('./routes');
const PORT = "1234";

app.use('/',route);

app.listen(PORT,(err)=>{
    if(err)
    {
        console.log("We got an error in starting the server at port "+PORT);
        return;
    }
    else{
        console.log("SERVER started at port "+PORT);
    }
})