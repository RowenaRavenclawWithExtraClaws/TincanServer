'use strict'

const fs = require('fs');
const credintials = JSON.parse(fs.readFileSync('/home/abdelrahman/Documents/Projects/Tincan/tincanServer/config.json', 'utf8'));
const client = require('twilio')(credintials.accountSid, credintials.authToken);

let generateCode = () => {
    let code = '';

    for (let i = 0; i < 6; i++) {
        code += Math.floor(Math.random() * 10).toString();
    }

    return code;
}

exports.sendMessege = async (phoneNumber) => {
    // this phoneNumber variable is passed with request body be the dart post method.  
    let code = await generateCode();

    await client.messages.create({
        body: code,
        from: credintials.smsSender,
        to: phoneNumber
    })

    return code;
}