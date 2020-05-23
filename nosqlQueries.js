'use strict'

const { userModel } = require('./nosqlModel');

exports.addUser = async (user) => {
    await userModel.create(user);
}

exports.findUserByID = async (id) => {
    const user = await userModel.findById(id, (err) => {
        if (err) console.log(err);
    });
    return user;
}

exports.findUserByPhone = async (phoneNum) => {
    const user = await userModel.find({ phone: phoneNum }, (err) => {
        if (err) console.log(err);
    });
    return user;
}

exports.findUsers = async (phones) => {
    let user = null;
    let results = [];

    for (let i = 0; i < req.body.length; i++) {
        user = await database.findUserByPhone(req.body[i].phone)

        if (user.length > 0) results.push(user);
    }

    return results;
}