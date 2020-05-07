'use strict'

const router = require('./routes');

router.appSlash.listen(8000);
router.appAddCan.listen(8001);
router.appFindCan.listen(8002);