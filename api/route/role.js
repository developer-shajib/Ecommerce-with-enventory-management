import express from 'express';
import tokenVerify from '../middlewares/tokenVerify.js';
import { createRole, deleteRole, getAllRole, getSingleRole, updateRole } from '../controllers/roleController.js';

const router = express.Router();

//token verify
router.use(tokenVerify);

// create route

router.route('/').get(getAllRole).post(createRole);
router.route('/:id').get(getSingleRole).delete(deleteRole).put(updateRole).patch(updateRole);

// export default router
export default router;
