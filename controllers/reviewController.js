import { Car } from '../model/carSchema.js';
import { Review } from '../model/reviewSchema.js';
import { User } from '../model/userModel.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { reviewSchema } from '../validation/reviewJoiSchema.js';

// Create a new review
// Create a new review
export const createReview = asyncHandler(async (req, res, next) => {
  
    // Validate request body using Joi
    const { error } = reviewSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(err => err.message),
      });
    }

    const { userId, carId, rating, reviewText } = req.body;

    // Check if user and car exist
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const carExists = await Car.findById(carId);
    if (!carExists) {
      return res.status(404).json({ success: false, message: 'Car not found' });
    }

    // Create the review
    const review = new Review({
      user: userId,
      car: carId,
      rating,
      reviewText,
    });

    await review.save();

    res.status(201).json({ success: true, message: 'Review created successfully', data: review });
  } )

// Get all reviews
export const getCarReview = asyncHandler(async (req, res, next) => {
  
    const reviewList = await Review.find().populate('user').populate('car')
    res.json({ success: true, message: 'Review list fetched', data: reviewList })
  })

// Get review by ID
// Get reviews for a specific car
export const getCarReviewById = asyncHandler(async (req, res, next) => {

  // const carId = req.params.carId;
  // const { carId } = req.params;
  const carId = req.params.id;
  // Check if car exists
  const carExists = await Car.findById(carId);
  if (!carExists) {
    return res.status(404).json({ success: false, message: 'Car not found' });
  }

  // Get reviews for the car
  const reviews = await Review.find({ car: carId }).populate('user').populate('car');

  res.json({ success: true, message: 'Reviews fetched successfully', data: reviews });
});


// Update review
export const updateCarReview = asyncHandler(async (req, res, next) => {
  
    // Validate request body using Joi
    const { error } = reviewSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(err => err.message),
      });
    }

    const { userId, carId, rating, reviewText } = req.body;
    const { id } = req.params;

    const updatedCarReview = await Review.findByIdAndUpdate(
      id,
      { user: userId, car: carId, rating, reviewText },
      { new: true }
    );

    if (!updatedCarReview) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    res.json({ success: true, message: 'Review updated successfully!', data: updatedCarReview });
  } )

// Delete review
export const deleteCarReview = asyncHandler(async (req, res, next) => {
  
    const { id } = req.params;
    const deleteCarReview = await Review.findByIdAndDelete(id);

    if (!deleteCarReview) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    res.json({ success: true, message: 'Review deleted successfully!', data: deleteCarReview });
  } )