import express from 'express';
import { createCar, deleteCar, getCarList, getCarListById, search, updateCar } from '../../controllers/carController.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { upload } from '../../middlewares/uploadMidlleware.js'; // Note the corrected spelling
import { authUser } from '../../middlewares/userAuth.js';

const router = express.Router();

router.get('/carList',authUser, asyncHandler(getCarList));
router.get('/carListById/:id',authUser, asyncHandler(getCarListById));
router.get("/search",search)

router.post('/create', upload.single('image'),authUser, asyncHandler(createCar));
router.put('/update/:id',authUser, asyncHandler(updateCar));
router.delete('/delete/:id',authUser, asyncHandler(deleteCar)); // Ensure the correct HTTP method for delete

export default router;
