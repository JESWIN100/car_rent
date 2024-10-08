import { Booking } from "../model/bookingSchema.js";
import { Car } from "../model/carSchema.js";
import { User } from "../model/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { bookingSchema } from "../validation/bookingJoiValidation.js";
import cron from 'node-cron';



export const createBooking = asyncHandler(async (req, res, next) => {
  

      const { error, value } = bookingSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const { userId,carId, startTime, startDate, endDate,endTime,pickupLocation,dropoffLocation } = req.body;

        // const foundUser = await User.findById(userId);
        // if (!foundUser) {
        //     return res.status(404).json({ success: false, message: "User not found" });
        // }
        const existingBooking = await Booking.findOne({startTime, startDate, endDate,endTime,pickupLocation,dropoffLocation,status: 'Pending',paymentStatus: 'pending' });
        if (existingBooking) {
            return res.status(400).json({ success: false, message: "Booking already exists" });
        }
       

        // const foundCar = await Car.findById(carId); 
        // if (!foundCar) {
        //     return res.status(404).json({ success: false, message: "Car not found" });
        // }

        const newBooking = new Booking({ userId, carId,startTime, startDate, endDate,endTime,pickupLocation,dropoffLocation });
        await newBooking.save();



        
        res.status(201).json({ success: true, message: "Booking created successfully", data: newBooking });
    } )


export const getBooking = asyncHandler(async (req, res, next) => {
   
  const bookings = await Booking.find().populate("carId")
  res.json({ success: true, message: 'Booking list fetched', data: bookings });;
    })

export const getBookingById = asyncHandler(async (req, res, next) => {
    
        const { id } = req.params;
        const carBooking = await Booking.findById(id).populate("carId").populate("userId")
        
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


export const cancelBooking = asyncHandler(async (req, res, next) => {
  const { bookingId } = req.params;

  const booking = await Booking.findById(bookingId);
  if (!booking) {
    return res.status(404).json({ success: false, message: "Booking not found" });
  }

  booking.status = 'Cancelled';
  booking.cancelledAt = new Date();

  await booking.save();

  res.status(200).json({ success: true, message: "Booking cancelled", data: booking });
});


export const confirmBooking = asyncHandler(async (req, res, next) => {
  const { bookingId } = req.params;

  const booking = await Booking.findById(bookingId).populate("carId")
  if (!booking) {
    return res.status(404).json({ success: false, message: "Booking not found" });
  }

  booking.status = 'Confirmed';
  booking.confirmedAt = new Date();

  await booking.save();

  res.status(200).json({ success: true, message: "Booking confirmed", data: booking });
});


export const deleteBookingByuser = asyncHandler(async (req, res, next) => {
  const { bookingId } = req.params;

  // Find and remove the booking
  const booking = await Booking.findByIdAndDelete(bookingId);

  // Check if booking exists
  if (!booking) {
    return res.status(404).json({ success: false, message: "Booking not found" });
  }

  // Respond with success message
  res.status(200).json({ success: true, message: "Booking deleted", data: booking });
});



  export const getBookingsByUserId = asyncHandler(async (req, res) => {
    const { userId } = req.params;
  
    // Find all bookings for the given userId
    const bookings = await Booking.find({ userId }); // Assuming userId is a field in your Booking model
  
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ success: false, message: "No bookings found for the provided User ID" });
    }
  
    res.status(200).json({ success: true, data: bookings });
  });



//automatic complete


// Schedule a job to run every day at midnight
cron.schedule('0 0 * * *', async () => {
  const currentDate = new Date();

  try {
    // Update bookings where endDate has passed and status is not 'Completed'
    const result = await Booking.updateMany(
      { endDate: { $lt: currentDate }, status: { $ne: 'Completed' } },
      { $set: { status: 'Completed' } }
    );
    console.log(`Updated ${result.nModified} bookings to "Completed" status.`);
  } catch (error) {
    console.error('Error updating bookings:', error);
  }
});


export const getAllBookings = asyncHandler(async (req, res, next) => {
  
  const bookings = await Booking.find().populate("carId")
  res.json({ success: true, message: 'Booking list fetched', data: bookings });
})