'use strict'

const { userModel } = require('./model');

exports.addUser = async (user) => {
    console.log('Writing a new user data to the database...');

    await userModel.create(user);
}

exports.findUserByID = async (id) => {
    console.log('Searching the database by ID...');

    const user = await userModel.findById(id);
    return user;
}

exports.findUserByPhone = async (phoneNum) => {
    console.log('Searching the database by phone...');

    const user = await userModel.find({ phone: phoneNum });
    return user;
}

exports.addFriend = async (user, friendPhone) => {
    console.log('Write a user data to the friend list of the current user');

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