import express from 'express';
import {
    getAllUsers,
    getUserByEmail,
    getUserById,
    updateUser,
    updateUserPassword,
    deleteUser
} from './controller.js';
import {authenticate, authorize} from '../middleware/auth.js'

const router = express.Router();

router.get('/users', authenticate, authorize('admin'), getAllUsers);
router.post('/user/email', authenticate, authorize('admin'), getUserByEmail);
router.post('/user', authenticate, authorize('user'),getUserById);
router.put('/user/info', authenticate, authorize('user'), updateUser);
router.put('/user/password', authenticate, authorize('user'), updateUserPassword);
router.delete('/user/:id', authenticate, authorize('admin', 'user'), deleteUser);

export default router;