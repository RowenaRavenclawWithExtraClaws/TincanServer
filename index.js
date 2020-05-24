'use strict'

const router = require('./nosqlRoutes');

try {
    //router.getCode.listen(8000);
    router.addUser.listen(8001);
    router.findUserByID.listen(8002);
    router.findUserByPhone.listen(8003);
    router.fetchUsers.listen(8004);
    router.addFriend.listen(8005);
}
catch (e) {
    console.log(e);
}
