import express from 'express';

import authController from '../controllers/authController';
import userController from '../controllers/userController';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.route('/').get(userController.getAllUsers);

export default router;
