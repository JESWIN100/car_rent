// reviewJoiSchema.js
import Joi from 'joi';

export const reviewSchema = Joi.object({
  userId: Joi.string().required().messages({
    'string.empty': 'User ID is required',
    'any.required': 'User ID is required',
  }),
  carId: Joi.string().required().messages({
    'string.empty': 'Car ID is required',
    'any.required': 'Car ID is required',
  }),
  rating: Joi.number().integer().min(1).max(5).required().messages({
    'number.base': 'Rating must be a number',
    'number.min': 'Rating must be at least 1',
    'number.max': 'Rating cannot be more than 5',
    'any.required': 'Rating is required',
  }),
  reviewText: Joi.string().required().messages({
    'string.empty': 'Review text is required',
    'any.required': 'Review text is required',
  }),
  // averageRating:Joi.string().required(),
});
