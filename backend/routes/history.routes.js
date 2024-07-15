import express from 'express';
import authCtrl from '../controllers/auth.controllers.js';
import historyCtrl from '../controllers/history.controllers.js';

const router = express.Router();

router.route('/api/history')
    .post(authCtrl.requireSignin, historyCtrl.create)


export default router;