'use strict'

const fs = require('fs');
const credintials = JSON.parse(fs.readFileSync('config.json', 'utf8'));

console.log(credintials.smsSender);