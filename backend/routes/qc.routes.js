import express from 'express';
import qcCtrl from '../controllers/qc.controllers.js';
// import authCtrl from '../controllers/auth.controllers.js';

const router = express.Router();

router.route('/api/qc/presses')
    .get(qcCtrl.listAll)
    .post(qcCtrl.create)

router.param('id', qcCtrl.findById)
router.route('/api/qc/presses/:id')
    .get(qcCtrl.read)
    .put(qcCtrl.update)
    .delete(qcCtrl.remove)

router.route('/api/qc/presses/customer/:customerName')
    .get(qcCtrl.findByName)


export default router;
