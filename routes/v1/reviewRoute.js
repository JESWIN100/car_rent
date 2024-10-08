import express from 'express';
import { validateReviewToken } from '../../middlewares/authReviewMiddleWare.js';
import { createReview, deleteCarReview, getAverage, getCarReview, getCarReviewById, getReviewById, updateCarReview } from '../../controllers/reviewController.js';
import { authUser } from '../../middlewares/userAuth.js';



const router = express.Router();

// Route to create a review
router.post("/cars/reviews",authUser, createReview);
router.get("/getReview",authUser,getCarReview)
router.get("/getReviewById/:id",authUser,getCarReviewById)
router.put("/updateCarReview/:id",authUser,updateCarReview)
router.delete("/delteReview/:id",authUser,deleteCarReview)

router.get("/getReviewssById/:id",authUser,getReviewById)
router.get("/average-rating/:carId",authUser,getAverage)


export default router;
 