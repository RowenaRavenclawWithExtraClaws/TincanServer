'use strict'

const accountSid = 'AC921c876b91b72e98f227a03299dfccb0'; // those are given
const authToken = 'fc5582d3c9e6d34bd337724f6a230bc0';    // by twilio.
const client = require('twilio')(accountSid, authToken);

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
        from: '+12563877866',
        to: phoneNumber
    })

    return code;
}