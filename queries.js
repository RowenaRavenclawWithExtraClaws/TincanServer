'use strict'

const { userModel } = require('./model');

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

    for (let i = 0; i < phones.length; i++) {
        user = await this.findUserByPhone(phones[i].phone)

        if (user.length > 0) results.push(user);
    }

    return results;
}

exports.addFriend = async (userPhone, friendPhone) => {
    let user = await this.findUserByPhone(userPhone);
    let friend = await this.findUserByPhone(friendPhone);

    if (friend.length > 0) {
        friend = {
            phone: friend[0].phone,
            name: friend[0].name,
            avatar: friend[0].avatar,
            playbook: []
        };

        user[0].friends.push(friend);
        await userModel.updateOne({ phone: userPhone }, { friends: user[0].friends });
    }
}