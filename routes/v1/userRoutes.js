import express from 'express';
import { checkUser, userCreate, userLogin, userProfile } from '../../controllers/userController.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { authUser } from '../../middlewares/userAuth.js';

const router = express.Router();

// Use asyncHandler to wrap the controller functions
router.post('/create', asyncHandler(userCreate));
router.post('/login', asyncHandler(userLogin));
router.get('/profile/:id', authUser, asyncHandler(userProfile));

router.get("/check-user",authUser,asyncHandler,(checkUser))
export default router;
