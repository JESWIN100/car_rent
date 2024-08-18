import { Car } from "../model/carSchema.js";
import { User } from "../model/userModel.js";
import { Wishlist } from "../model/wishlistSchema.js";
import { asyncHandler } from "../utils/asyncHandler.js";



// Create or update a user's wishlist
export const userWhislList = asyncHandler(async (req, res, next) => {

    const { userId, carId } = req.body;

    // Validate input
    if (!userId || !carId) {
      return res.status(400).json({ success: false, message: "User ID and Car ID are required" });
    }

    // Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if car exists
    const carExists = await Car.findById(carId);
    if (!carExists) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    // Find or create wishlist
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
        wishlist = new Wishlist({ user: userId });
    }

   // Check if car already exists in the wishlist
   const carInWishlist = wishlist.cars.find(item => item.car.toString() === carId);
    
   if (carInWishlist) {
     // Remove car if it already exists
     wishlist.cars.pull(carInWishlist._id);
   } else {
     // Add car if it doesn't exist
     wishlist.cars.push({ car: carId });
   }

    await wishlist.save();

    res.status(200).json({ success: true, message: "Wishlist updated successfully", data: wishlist });
  })

export const getWishlistById = asyncHandler(async (req, res, next) => {
  
        const { userId } = req.params;
        const wishlist = await Wishlist.findOne({user:userId}).populate("cars");
        
        if (!wishlist) {
            return res.status(404).json({ success: false, message: 'wishlist not found' });
        }
        
        res.json({ success: true, message: 'wishlist update successfully', data: wishlist });
    })

export const deleteWishlistById = asyncHandler(async (req, res, next) => {
  
      const { userId } = req.params;
  
      // Find the wishlist for the user
      const wishlist = await Wishlist.findOne({ user: userId });
  
      if (!wishlist) {
        return res.status(404).json({ success: false, message: 'Wishlist not found' });
      }
  
      // Delete the wishlist
      await Wishlist.deleteOne({ user: userId });
  
      res.json({ success: true, message: 'Wishlist deleted successfully' });
    } )
  