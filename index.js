'use strict'

const router = require('./nosqlRoutes');

try {
    //router.getCode.listen(8000);
    router.addUser.listen(8006);
    router.findUserByID.listen(8005);
    router.findUserByPhone.listen(8004);
}
catch (e) {
    console.log(e);
}
