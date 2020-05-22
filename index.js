'use strict'

const router = require('./sqlRoutes');

router.appGetCode.listen(8000);
router.appAddCan.listen(8001);
router.appFindCan.listen(8002);
router.appFetchCans.listen(8003);