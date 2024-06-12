import express from 'express';
import exportCtrl from '../controllers/export.controllers.js';
// import authCtrl from '../controllers/auth.controllers.js';

const router = express.Router();

router.route('/api/export/exportByMonth/:year/:month')
<<<<<<< server-demo
    .get(authCtrl.requireSignin, exportCtrl.exportToExcelByMonth);

router.route('/api/export/exportByPage/:year/:month')
    .get(authCtrl.requireSignin, exportCtrl.exportToExcelByPage);

router.route('/api/export/exportByDay/:year/:month/:day')
    .get(authCtrl.requireSignin, exportCtrl.exportToExcelByDay);
=======
    .get(exportCtrl.exportToExcelByMonth);

router.route('/api/export/exportByPage/:year/:month')
    .get(exportCtrl.exportToExcelByPage);

router.route('/api/export/exportByDay/:year/:month/:day')
    .get(exportCtrl.exportToExcelByDay);
>>>>>>> server

export default router;