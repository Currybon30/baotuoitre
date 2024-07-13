import express from 'express';
import qcCtrl from '../controllers/qc.controllers.js';
import authCtrl from '../controllers/auth.controllers.js';

const router = express.Router();

router.route('/api/qc/presses')
    .get(qcCtrl.listAll)
    .post(authCtrl.requireSignin, qcCtrl.create)

router.route('/api/qc/presses/customer')
    .get(qcCtrl.findByName)

router.route('/api/qc/presses/customer/case-insensitive')
    .get(qcCtrl.findByNameCaseInsensitive)

router.route('/api/qc/presses/delete-many')
    .delete(authCtrl.requireSignin, qcCtrl.removeMultiplePresses)

router.param('id', qcCtrl.findById)
router.route('/api/qc/presses/:id')
    .get(authCtrl.requireSignin, qcCtrl.read)
    .put(authCtrl.requireSignin, qcCtrl.update)
    .delete(authCtrl.requireSignin, qcCtrl.remove)


export default router;
