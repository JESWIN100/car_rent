import { Booking } from "../model/bookingSchema.js";
import { Car } from "../model/carSchema.js";
import { User } from "../model/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { bookingSchema } from "../validation/bookingJoiValidation.js";

export const createBooking = asyncHandler(async (req, res, next) => {
  

      const { error, value } = bookingSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const { carId,userId, startTime, startDate, endDate,endTime,pickupLocation,dropoffLocation } = req.body;

        // const foundUser = await User.findById(userId);
        // if (!foundUser) {
        //     return res.status(404).json({ success: false, message: "User not found" });
        // }
        const existingBooking = await Booking.findOne({startTime, startDate, endDate,endTime,pickupLocation,dropoffLocation });
        if (existingBooking) {
            return res.status(400).json({ success: false, message: "Booking already exists" });
        }

        const foundCar = await Car.findById(carId); 
        if (!foundCar) {
            return res.status(404).json({ success: false, message: "Car not found" });
        }

        const newBooking = new Booking({  carId,userId,startTime, startDate, endDate,endTime,pickupLocation,dropoffLocation });
        await newBooking.save();

        res.status(201).json({ success: true, message: "Booking created successfully", data: newBooking });
    } )


export const getBooking = asyncHandler(async (req, res, next) => {
   
        const bookings = await Booking.find().populate('userId').populate("carId")
        res.json({ success: true, message: 'Booking list fetched', data: bookings });
    })

export const getBookingById = asyncHandler(async (req, res, next) => {
    
        const { id } = req.params;
        const carBooking = await Booking.findById(id).populate('userId').populate("carId")
        
        if (!carBooking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        
        res.json({ success: true, message: 'booking fetched successfully', data: carBooking });
    } )



 export const updateBooking = asyncHandler(async (req, res, next) => {
        // Validate the request body using Joi
        const { error } = bookingSchema.validate(req.body);
        if (error) {
          return res.status(400).json({ success: false, message: error.details[0].message });
        }
      
        const { id } = req.params;
        const { user, car, startTime, startDate, endDate, endTime, totalPrice, pickupLocation, dropoffLocation, licenceNumber } = req.body;
      
        // Find and update the booking
        try {
          const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            { user, car, startTime, startDate, endDate, endTime, totalPrice, pickupLocation, dropoffLocation, licenceNumber },
            { new: true, runValidators: true }  // Ensures the updated document is returned and validates it against the schema
          );
      
          // Check if the booking was found and updated
          if (!updatedBooking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
          }
      
          res.json({ success: true, message: 'Booking updated successfully!', data: updatedBooking });
        } catch (err) {
          console.log(err);  // Pass error to the error handling middleware
        }
      });


export const deleteBooking = asyncHandler(async (req, res, next) => {
const { id } = req.params;
const deletedBooking = await Booking.findByIdAndDelete(id);

if (!deletedBooking) {
    return res.status(404).json({ success: false, message: 'Booking not found' });
}

res.json({ success: true, message: 'Booking deleted successfully!', data: deletedBooking });
})

export const getBookingByCarId = asyncHandler(async (req, res) => {
  const { carId } = req.params;

  const booking = await Booking.findOne({ car: carId });
  if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found for the provided car ID" });
  }

  res.status(200).json({ success: true, data: booking });
});