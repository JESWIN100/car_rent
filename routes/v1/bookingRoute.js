import express from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { createBooking, deleteBooking, getBooking, getBookingById, updateBooking } from '../../controllers/bookingController.js';
import { authUser } from '../../middlewares/userAuth.js';

const router = express.Router();

router.post("/createBooking",authUser, asyncHandler,(createBooking));
router.get("/getBooking",authUser, asyncHandler,(getBooking));
router.get("/getBooking/:id",authUser, asyncHandler,(getBookingById));
router.put('/update/:id',authUser, asyncHandler,(updateBooking));
router.delete("/delete/:id",authUser, asyncHandler,(deleteBooking));

export default router;
 