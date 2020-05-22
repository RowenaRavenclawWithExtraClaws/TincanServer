'use strict'

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tincan', { useNewUrlParser: true });

const Schema = mongoose.Schema;

const userSchema = new Schema({
    phone: String,
    name: String,
    avatar: String,
    logged: Boolean,
    friends: [
        {
            phone: String,
            name: String,
            avatar: String,
            playbook: [
                {
                    name: String,
                    artist: String,
                    streamedDate: Date,
                    streamerID: String
                }
            ]
        }
    ],
    concerts: [
        {
            name: String,
            avatar: String,
            dataCreated: Date,
            creatorID: String,
            adminID: String,
            playbook: [
                {
                    name: String,
                    artist: String,
                    streamedDate: Date,
                    streamerID: String
                }
            ]
        }
    ],
    parties: [
        {
            name: String,
            avatar: String,
            dataCreated: Date,
            creatorID: String,
            admins: [{ adminID: String }],
            playbook: [
                {
                    name: String,
                    artist: String,
                    streamedDate: Date,
                    streamerID: String
                }
            ]
        }
    ]
});

// retieve a model from the user schema
let user = mongoose.model('user', userSchema);

exports.user = user;