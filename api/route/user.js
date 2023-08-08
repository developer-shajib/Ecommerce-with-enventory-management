import express from 'express';
import { changePass, createUser, deleteUser, getAllUser, getSingleUser, updateUser } from '../controllers/userController.js';
import tokenVerify from '../middlewares/tokenVerify.js';

const router = express.Router();

//token verify
router.use(tokenVerify);

// create route

router.route('/').get(getAllUser).post(createUser);
router.route('/:id').get(getSingleUser).delete(deleteUser).put(updateUser).patch(updateUser);
router.route('/password/:id').post(changePass);

// export default router
export default router;
