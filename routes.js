'use strict'

const sender = require('./sendingSMS');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.text());

let code = '';

exports.app = app.post('/', async (req, res) => {
    code = await sender.sendMessege(req.body);
    res.status(200).send(code);
})