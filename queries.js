'use strict'

const { userModel } = require('./model');

exports.addUser = async (user) => {
    await userModel.create(user);
}

exports.findUserByID = async (id) => {
    const user = await userModel.findById(id);
    return user;
}

exports.findUserByPhone = async (phoneNum) => {
    const user = await userModel.find({ phone: phoneNum });
    return user;
}

exports.addFriend = async (user, friendPhone) => {
    let friend = await this.findUserByPhone(friendPhone);

    if (friend.length > 0) {
        friend = {
            phone: friend[0].phone,
            name: friend[0].name,
            avatar: friend[0].avatar
        };

        user.friends.push(friend);
        await userModel.updateOne({ phone: user.phone }, { friends: user.friends });
    }
}