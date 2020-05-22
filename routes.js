'use strict'

const sender = require('./sendingSMS');
const express = require('express');
const bodyParser = require('body-parser');
const database = require('./database')
const fs = require('fs');
const app = express();

app.use(bodyParser.text({ limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

let code = '';

exports.appGetCode = app.post('/getCode', async (req, res) => {
    code = await sender.sendMessege(req.body)
        .catch(e => {
            res.sendStatus(404); // indicating there is no code retirved
        })
        .finally(async () => {
            await database.prisma.disconnect();
        });

    res.status(200).send(code);
});

// request body consists of a can object
exports.appAddCan = app.post('/addCan', async (req, res) => {
    var realFile = Buffer.from(req.body.avatar, 'base64');
    var name = req.body.phone + '.' + req.body.extention;
    var avatarPath = 'avatars/' + name;

    fs.writeFile(avatarPath, realFile, function (err) {
        if (err)
            console.log(err);
    });

    var can = {
        "avatar": name,
        "name": req.body.name,
        "phone": req.body.phone,
    };

    await database.addCan(can)
        .catch(e => {
            res.sendStatus(404);
        })
        .finally(async () => {
            await database.prisma.disconnect();
        });

    res.sendStatus(200);
});

exports.appFindCan = app.get('/findCan/:phone', async (req, res) => {
    const result = await database.findCanByPhone(req.params.phone)
        .catch(e => {
            res.sendStatus(404);
        })
        .finally(async () => {
            await database.prisma.disconnect();
        });

    if (result == null) res.sendStatus(404);
    else res.sendStatus(200);
});

// request body consists of array of phone numbers in json format
exports.appFetchCans = app.post('/fetchCans', async (req, res) => {
    let fetchedCan = null;
    let results = [];

    for (let i = 0; i < req.body.length; i++) {
        fetchedCan = await database.findCanByPhone(req.body[i].phone)
            .catch(async e => {
                res.status(404).send(null);
                await database.prisma.disconnect();
            })
        results.push(fetchedCan);
    }

    await database.prisma.disconnect();
    res.status(200).send(results);
});

// request body consists of array of phone numbers in json format
// with the first element being the user's phone number
exports.appFetchPlaybooks = app.post('/fetchPlaybooks', async (req, res) => {
    
});