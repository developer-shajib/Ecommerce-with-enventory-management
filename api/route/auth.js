import express from 'express';
import { login, logout, register, loggedInUser, forget, resetPassword } from '../controllers/authController.js';
import tokenVerify from '../middlewares/tokenVerify.js';

const router = express.Router();

// create route
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/register').post(register);
router.route('/me').get(tokenVerify, loggedInUser);
router.route('/forget').post(forget);
router.route('/forget/:token/:id').get(resetPassword);

// export default router
export default router;
