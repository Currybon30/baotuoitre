import express from 'express';
import exportCtrl from '../controllers/export.controllers.js';

const router = express.Router();

router.route('/api/export/exportByMonth/:year/:month')
    .get(exportCtrl.exportToExcelByMonth);

router.route('/api/export/exportByPage/:year/:month')
    .get(exportCtrl.exportToExcelByPage);

router.route('/api/export/exportByDay/:year/:month/:day')
    .get(exportCtrl.exportToExcelByDay);

export default router;