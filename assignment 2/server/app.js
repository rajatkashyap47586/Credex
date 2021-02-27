const express =require('express');
const app = express();
const routes = require('./routes');
const PORT = "1234";

app.use('/',routes);

app.listen(PORT, (err)=>{
    if(err)
    {
        console.log("hmmm error occured while starting the server at port "+PORT);
        return;
    }
    console.log("server started at port "+PORT)
})