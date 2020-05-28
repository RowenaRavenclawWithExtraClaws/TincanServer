'use strict'

const router = require('./routes');

try {
    router.getCode.listen(8000);
    router.addUser.listen(8001);
    router.findUserByID.listen(8002);
    router.findUserByPhone.listen(8003);
    router.addFriend.listen(8004);
    router.addFriends.listen(8005);

    console.log('listening on ports 8000 through 8005');
}
catch (e) {
    console.log(e);
}
