'use strict'

const fs = require('fs');
const sender = require('./sendingSMS');
const database = require('./queries')

exports.getCode = async (req, res) => {
    console.log('Getting verification code...');

    let code = await sender.sendMessege(req.params.phone)
        .catch(e => {
            res.sendStatus(404); // indicating there is no code retirved
            console.log(e);
        });

    res.status(200).send(code);

    console.log('Done');
}

exports.addUser = async (req, res) => {
    let realFile = Buffer.from(req.body.avatar, 'base64');
    let name = req.body.phone + '.' + req.body.extention;
    let avatarPath = 'avatars/users/' + name;
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
}

exports.findUserByID = async (req, res) => {
    console.log('Searching for user by a certain ID...');

    const user = await database.findUserByID(req.params.id).catch(err => {
        res.sendStatus(404);
        console.log(err);
    });

    res.status(200).send(user); // user can be an empty array

    console.log('Done');
}

exports.findUserByPhone = async (req, res) => {
    console.log('Searching for user by a certain phone number...');

    const user = await database.findUserByPhone(req.params.phone).catch(err => {
        res.sendStatus(404);
    });
    if (user.length > 0) res.status(200).send(user[0]); // get the first (and only) element from the user array

    res.sendStatus(404);

    console.log('Done');
}

exports.addFriend = async (req, res) => {
    console.log('Add a friend to the current user friend list...');

    await database.addFriend(req.body.userPhone, req.body.friendPhone).catch(e => {
        res.sendStatus(404);
        console.log(e);
    });

    res.sendStatus(201);

    console.log('Done');
}

exports.addFriends = async (req, res) => {
    console.log('Add multiple friends to the current user friend list...');

    let phoneList = await JSON.parse(req.body.phones);
    let user = await database.findUserByPhone(req.body.phone);

    phoneList.map((phoneNumber) => {
        database.addFriend(user[0], phoneNumber).catch(e => {
            res.sendStatus(404);
            console.log(e);
        });
    });

    res.sendStatus(201);

    console.log('Done');
}

exports.fetchAvatars = async (req, res) => {
    console.log('fetching avatars...');

    let img = '';
    let imgPaths = await JSON.parse(req.body);
    let phoneToImg = {};

    imgPaths.map((imgPath) => {
        img = fs.readFileSync(imgPath, { encoding: 'base64' });
        let key = imgPath.substr(14, 17);

        phoneToImg[key] = img;
    });

    res.send(phoneToImg);
}