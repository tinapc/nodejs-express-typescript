import express from 'express';
const router = express.Router();

import { deleteUser, listUsers, updateUser } from '../Controllers/User';
import { verifyToken } from '../Middlewares/verifyToken';
import { verifyOwner } from '../Middlewares/verifyOwner';

router.get('/', verifyToken, listUsers);
router.put('/:id', verifyOwner, updateUser);
router.delete('/:id', verifyToken, deleteUser);

export default router;
