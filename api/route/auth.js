import express from 'express';
import {
  login,
  logout,
  register,
  loggedInUser
} from '../controllers/authController.js';
import tokenVerify from '../middlewares/tokenVerify.js';

const router = express.Router();

// create route
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/register').post(register);
router.route('/me').get(tokenVerify, loggedInUser);

// export default router
export default router;
