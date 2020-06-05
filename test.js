'use strict'
const fs = require('fs');

let xMap = {}
let img = fs.readFileSync('avatars/users/+201143365421.jpg', { encoding: 'base64' });
let key = 'avatars/users/+201143365421.jpg'.substr(14, 17);

xMap[key] = img;

console.log(key);