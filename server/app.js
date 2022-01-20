const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const data = require('./data')

const app = express();

app.use(cors('localhost'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/* Implement your routes here */
app.get('/animals', function(_req, res) {
    res.status(200).send(data);
})

module.exports = app;
