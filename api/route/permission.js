import express from 'express';
import tokenVerify from '../middlewares/tokenVerify.js';
import { createPermission, deletePermission, getAllPermission, getSinglePermission, updatePermission } from '../controllers/permissionController.js';

const router = express.Router();

//token verify
router.use(tokenVerify);

// create route

router.route('/').get(getAllPermission).post(createPermission);
router.route('/:id').get(getSinglePermission).delete(deletePermission).put(updatePermission).patch(updatePermission);

// export default router
export default router;
