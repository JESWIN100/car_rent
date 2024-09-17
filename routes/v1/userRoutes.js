import express from 'express';
import { checkUser, updateUser, userCreate, userLogin, userLogout, userProfile } from '../../controllers/userController.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { authUser } from '../../middlewares/userAuth.js';
import { upload } from '../../middlewares/uploadMidlleware.js';

const router = express.Router();

// Use asyncHandler to wrap the controller functions
router.post('/create',upload.single('image'), asyncHandler(userCreate));
router.post('/login', asyncHandler(userLogin));
router.get('/profile', authUser, asyncHandler(userProfile));
router.post("/logout",authUser,asyncHandler(userLogout))
router.put('/updateUser/:id',upload.single('image'),authUser, asyncHandler(updateUser));

router.get("/check-user",authUser,(checkUser))
export default router;
