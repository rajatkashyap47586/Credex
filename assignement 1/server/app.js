const express = require('express');
const app = express();
const router = require('./routes');

const PORT = "1234";

app.use('/',router);

app.listen(PORT, () => {
    console.log("server started at port =" + PORT);
})