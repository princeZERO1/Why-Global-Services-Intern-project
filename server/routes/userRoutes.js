import express from 'express';
import { updateUserProfile, updateUserAddress } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.put('/profile', protect, updateUserProfile);
router.put('/address', protect, updateUserAddress);

export default router;
