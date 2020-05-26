'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const sender = require('./sendingSMS');
const database = require('./queries')
const fs = require('fs');
const app = express();

app.use(bodyParser.text({ limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

exports.getCode = app.get('/getCode/:phone', async (req, res) => {
    let code = await sender.sendMessege(req.params.phone)
        .catch(e => {
            res.sendStatus(404); // indicating there is no code retirved
        });

    res.status(200).send(code);
});

exports.addUser = app.post('/addUser', async (req, res) => {
    let realFile = Buffer.from(req.body.avatar, 'base64');
    let name = req.body.phone + '.' + req.body.extention;
    let avatarPath = 'avatars/' + name;
    let saved = true;

    fs.writeFile(avatarPath, realFile, function (err) {
        if (err) {
            res.sendStatus(404);
            console.log(err);
            saved = false;
        }
    });

    req.body.avatar = avatarPath;

    if (saved) {
        await database.addUser(req.body).catch(e => {
            res.sendStatus(404);
            console.log(e);
        });
    }

    res.sendStatus(201);
});

exports.findUserByID = app.get('/findUserByID/:id', async (req, res) => {
    const user = await database.findUserByID(req.params.id).catch(err => {
        res.sendStatus(404);
    });

    res.status(200).send(user); // user can be empty array
});

exports.findUserByPhone = app.get('/findUserByPhone/:phone', async (req, res) => {
    const user = await database.findUserByPhone(req.params.phone).catch(err => {
        res.sendStatus(404);
    });

    res.status(200).send(user);
});

exports.fetchUsers = app.post('/fetchUsers', async (req, res) => {
    results = database.findUsers(req.body).catch(err => {
        res.sendStatus(404);
    });

    res.status(200).send(results);
});

exports.addFriend = app.post('/addFriend', async (req, res) => {
    await database.addFriend(req.body.userPhone, req.body.friendPhone).catch(e => {
        res.sendStatus(404);
        console.log(e);
    });

    res.sendStatus(201);
});