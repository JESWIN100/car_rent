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

        const { user, car,startTime, startDate, endDate,endTime, totalPrice,pickupLocation,dropoffLocation,licenceNumber } = req.body;

        const foundUser = await User.findById(user);
        if (!foundUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const existingBooking = await Booking.findOne({user,car,startDate });
        if (existingBooking) {
            return res.status(400).json({ success: false, message: "Booking already exists" });
        }

        const foundCar = await Car.findById(car);
        if (!foundCar) {
            return res.status(404).json({ success: false, message: "Car not found" });
        }

        const newBooking = new Booking({ user, car,startTime, startDate, endDate,endTime, totalPrice,pickupLocation,dropoffLocation,licenceNumber });
        await newBooking.save();

        res.status(201).json({ success: true, message: "Booking created successfully", data: newBooking });
    } )


export const getBooking = asyncHandler(async (req, res, next) => {
   
        const bookings = await Booking.find().populate('user car');
        res.json({ success: true, message: 'Booking list fetched', data: bookings });
    })

export const getBookingById = asyncHandler(async (req, res, next) => {
    
        const { id } = req.params;
        const carBooking = await Booking.findById(id);
        
        if (!carBooking) {
            return res.status(404).json({ success: false, message: 'Car not found' });
        }
        
        res.json({ success: true, message: 'Car fetched successfully', data: carBooking });
    } )


export const updateBooking =asyncHandler(async(req,res,next)=>{

    const { error, value } = bookingSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
   
    const { user, car,startTime, startDate, endDate,endTime, totalPrice,pickupLocation,dropoffLocation,licenceNumber} = req.body;
    const { id } = req.params;

    // Find and update the booking
    const updatedBooking = await Booking.findByIdAndUpdate(
        id,
        { user, car,startTime, startDate, endDate,endTime, totalPrice,pickupLocation,dropoffLocation,licenceNumber },
        { new: true }  // Return the updated document
    );

    // Check if booking was found and updated
    if (!updatedBooking) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.json({ success: true, message: 'Booking updated successfully!', data: updatedBooking });
})


export const deleteBooking = asyncHandler(async (req, res, next) => {
const { id } = req.params;
const deletedBooking = await Booking.findByIdAndDelete(id);

if (!deletedBooking) {
    return res.status(404).json({ success: false, message: 'Booking not found' });
}

res.json({ success: true, message: 'Booking deleted successfully!', data: deletedBooking });
})

