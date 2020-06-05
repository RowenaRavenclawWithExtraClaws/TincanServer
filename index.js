'use strict'

const router = require('./routes');

try {
    router.getCode.listen(8009);
    router.addUser.listen(8010);
    router.findUserByID.listen(8011);
    router.findUserByPhone.listen(8012);
    router.addFriend.listen(8013);
    router.addFriends.listen(8014);
    router.fetchAvatars.listen(8015);

    console.log('listening on ports 8000 through 8006');
}
catch (e) {
    console.log(e);
}
