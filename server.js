const express = require('express');
const app = express();
const bodyParser=require('body-parser');
const db = require('./Backend/db');
const router = require('./Backend/Routes/personRoute');
const path=require('path');
require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/Frontend')));




app.use('/', router);

const port=process.env.PORT||3000;
app.listen(port, () => {
    console.log("server is running");
});
