'use strict'

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const sender = require('./sendingSMS');
const database = require('./queries')

const app = express();

app.use(bodyParser.text({ limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

exports.getCode = app.get('/getCode/:phone', async (req, res) => {
    console.log('Getting verification code...');

    let code = await sender.sendMessege(req.params.phone)
        .catch(e => {
            res.sendStatus(404); // indicating there is no code retirved
            console.log(e);
        });

    res.status(200).send(code);

    console.log('Done');
});

exports.addUser = app.post('/addUser', async (req, res) => {
    let realFile = Buffer.from(req.body.avatar, 'base64');
    let name = req.body.phone + '.' + req.body.extention;
    let avatarPath = 'avatars/' + name;
    let saved = true;

    console.log('Saving user avatar...');

    fs.writeFile(avatarPath, realFile, function (err) {
        if (err) {
            res.sendStatus(404);
            console.log(err);
            saved = false;
        }
    });

    console.log('Done');

    req.body.avatar = avatarPath;

    if (saved) {
        console.log('Adding new user...');

        await database.addUser(req.body).catch(e => {
            res.sendStatus(404);
            console.log(e);
        });
    }

    res.sendStatus(201);

    console.log('Done');
});

exports.findUserByID = app.get('/findUserByID/:id', async (req, res) => {
    console.log('Searching for user by a certain ID...');

    const user = await database.findUserByID(req.params.id).catch(err => {
        res.sendStatus(404);
        console.log(err);
    });

    res.status(200).send(user); // user can be an empty array

    console.log('Done');
});

exports.findUserByPhone = app.get('/findUserByPhone/:phone', async (req, res) => {
    console.log('Searching for user by a certain phone number...');

    const user = await database.findUserByPhone(req.params.phone).catch(err => {
        res.sendStatus(404);
    });

    res.status(200).send(user);

    console.log('Done');
});

exports.addFriend = app.post('/addFriend', async (req, res) => {
    console.log('Add a friend to the current user friend list...');

    await database.addFriend(req.body.userPhone, req.body.friendPhone).catch(e => {
        res.sendStatus(404);
        console.log(e);
    });

    res.sendStatus(201);

    console.log('Done');
});

exports.addFriends = app.post('/addFriends', async (req, res) => {
    console.log('Add multiple friends to the current user friend list...');

    let phoneList = await JSON.parse(req.body.phones);
    let user = await database.findUserByPhone(req.body.phone);

    for (let i = 0; i < phoneList.length; i++) {
        await database.addFriend(user[0], phoneList[i]).catch(e => {
            res.sendStatus(404);
            console.log(e);
        });
    }

    res.sendStatus(201);

    console.log('Done');
});