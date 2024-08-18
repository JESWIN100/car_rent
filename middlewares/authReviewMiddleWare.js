import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';

// Middleware to validate review token
export const validateReviewToken = asyncHandler(async (req, res, next) => {
    const reviewToken = req.headers['review-token'] || req.headers['Review-Token'];
    console.log("token=======>",reviewToken);
    
    
    if (!reviewToken) {
        res.status(401).json({ message: 'No review token provided' });
        return; // Ensure that the function stops execution
    }

    try {
        const decoded = jwt.verify(reviewToken, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded token data to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ message: 'Invalid review token' });
    }
});

