import express from 'express';
import exportCtrl from '../controllers/export.controllers.js';

const router = express.Router();

router.route('/api/export/exportByMonth/:month')
    .get(exportCtrl.exportToExcelByMonth);

export default router;