import express from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { createBooking, deleteBooking, getBooking, getBookingByCarId, getBookingById, updateBooking } from '../../controllers/bookingController.js';
import { authUser } from '../../middlewares/userAuth.js';

const router = express.Router();

router.post("/createBooking",authUser,(createBooking));
router.get("/getBooking",authUser,(getBooking));
router.get("/getBooking/:id",authUser,(getBookingById));
router.put('/update/:id',authUser,(updateBooking));
router.delete("/delete/:id",authUser,(deleteBooking));
router.get("/car/:id",authUser,(getBookingByCarId));
export default router;
 