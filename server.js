const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const axios = require('axios');
const path = require('path');
const compression = require('compression');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.urlencoded({ extended: false}))


app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'img')));
app.use(express.static(path.join(__dirname, 'scripts')));


require('./routes/user')(app);


module.exports = app;
