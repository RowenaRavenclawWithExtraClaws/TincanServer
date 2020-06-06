'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const logic = require('./routeLogic');

const app = express();

app.use(bodyParser.text({ limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

exports.getCode = app.get('/getCode/:phone', logic.getCode);

exports.addUser = app.post('/addUser', logic.addUser);

exports.findUserByID = app.post('/addUser', logic.findUserByID);

exports.findUserByPhone = app.post('/addUser', logic.findUserByPhone);

exports.addFriend = app.post('/addUser', logic.addFriend);

exports.addFriends = app.post('/addUser', logic.addFriends);

exports.fetchAvatars = app.post('/addUser', logic.fetchAvatars);