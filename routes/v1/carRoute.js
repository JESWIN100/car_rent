import express from 'express';
import { createCars, getCarList, updateCars } from '../../controllers/carController.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { upload } from '../../middlewares/uploadMidlleware.js'; // Note the corrected spelling

const router = express.Router();


router.get('/courseList', asyncHandler(getCarList))
 router.post('/create', upload.single('image'), asyncHandler(createCars))
 router.put('/update/:id', asyncHandler(updateCars))
//   .delete('/delete/:id', asyncHandler(deleteCar)); // Assuming you have a deleteCar function

export default router;
