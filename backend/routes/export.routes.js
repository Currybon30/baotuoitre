import express from 'express';
import exportCtrl from '../controllers/export.controllers.js';
// import authCtrl from '../controllers/auth.controllers.js';

const router = express.Router();

router.route('/api/export/exportByMonth/:year/:month')
    .get(authCtrl.requireSignin, exportCtrl.exportToExcelByMonth);

router.route('/api/export/exportByPage/:year/:month')
    .get(authCtrl.requireSignin, exportCtrl.exportToExcelByPage);

router.route('/api/export/exportByDay/:year/:month/:day')
    .get(authCtrl.requireSignin, exportCtrl.exportToExcelByDay);

export default router;