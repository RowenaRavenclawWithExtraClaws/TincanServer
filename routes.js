'use strict'

const sender = require('./sendingSMS');
const express = require('express');
const bodyParser = require('body-parser');
const database = require('./database')
const app = express();

app.use(bodyParser.text());
app.use(bodyParser.json());

let code = '';

exports.appSlash = app.post('/', async (req, res) => {
    code = await sender.sendMessege(req.body);
    res.status(200).send(code);
});

exports.appAddCan = app.post('/addCan', async (req, res) => {
    await database.addCan(req.body)
        .catch(e => {
            throw e;
        })
        .finally(async () => {
            await database.prisma.disconnect();
        });

    res.status(200).send('ok');
})

exports.appFindCan = app.get('/findCan/:id', async (req, res) => {
    const result = await database.findCan(parseInt(req.params.id))
        .catch(e => {
            throw e;
        })
        .finally(async () => {
            await database.prisma.disconnect();
        });

    res.status(200).send(result);
})