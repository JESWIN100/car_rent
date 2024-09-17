import { Admin } from "../model/adminSchema.js";
import { Booking } from "../model/bookingSchema.js";
import { Car } from "../model/carSchema.js";
import { User } from "../model/userModel.js";
import bcrypt  from 'bcrypt'
import { generateAdminToken } from "../utils/generateToken.js";
import { validateUserRegistration } from "../validation/userJoiValidation.js";
import { Review } from "../model/reviewSchema.js";
import { asyncHandler } from '../utils/asyncHandler.js';
import { adminCreateSchema, adminLoginSchema } from "../validation/adminJoiSchema.js";
import { createCarsValidation } from "../validation/carJoiValidation.js";
import bookingSchema from "../validation/bookingJoiValidation.js";
import { cloudinaryInstance } from "../config/cloudinaryConfig.js";
import { Driver } from "../model/driverDetailsSchema.js";
import { Contact } from "../model/contactModel.js";
import { Payment } from "../model/paymetSchema.js";

export const AdminCreate = asyncHandler(async (req, res, next) => {
   
        // Validate the request body using Joi
        const { error } = adminCreateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const { adminName, email, password } = req.body;

        const adminExist = await Admin.findOne({ email });
        if (adminExist) {
            return res.status(400).json({ success: false, message: "Admin already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new admin
        const newAdmin = new Admin({ adminName, email, password: hashedPassword });
        await newAdmin.save();

        const adminToken = generateAdminToken(email, "admin");

        // Set token in cookie
        res.cookie("Admintoken", adminToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        res.json({ success: true, message: "Admin created successfully" });
    } )


export const adminLogin = asyncHandler(async (req, res, next) => {
  
        // Validate the request body using Joi
        const { error } = adminLoginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const { email, password } = req.body;

        const adminExist = await Admin.findOne({ email });

        if (!adminExist) {
            return res.status(404).json({ success: false, message: "Admin does not exist" });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, adminExist.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Create token
        const token = generateAdminToken(email, "admin");

        // Set token in cookie
        res.cookie("Admintoken", token, {sameSite:"None",secure:true});
        res.json({ success: true, message: "Admin login successfully" });
    } )

export const adminProfile=asyncHandler(async(req,res,next)=>{
  

    const {id}=req.params
    const userData=await Admin.findById(id).select("-password")

    
  res.json({success:true,message:'admin data fetched',data:userData})


    } )

 export const checkAdmin=asyncHandler(async(req,res,next)=>{
  

        const admin=req.admin;
        if(!admin){
            return res.status(401).json({success:false,message:'admin not authenticated'})
            }
        
      res.json({success:true,message:'admin is authenticated'})
    
    
} )

export const AdminLogout=asyncHandler(async(req,res,next)=>{

    res.clearCookie("Admintoken")
    res.json({success:true,message:'Admin logged out successfully'})
    

   } )



// User Management Routes

export const AdminUserCreate=asyncHandler(async(req,res,next)=>{


    //validation fro joi
    const {error}= await validateUserRegistration(req.body);
    if (error) {
        return res.status(402).json({ success: false, message: error.details[0].message });
    }

        const {name,email,password,phone}=req.body;
      
        const userExit=await User.findOne({email})
        if(userExit){
            return res.status(400).json({ success: false,message:'user already exist'})
            }

//hasing
        const salt=10
        const hashedPassword=bcrypt.hashSync(password,salt)

const newUser=new User({name,email,password:hashedPassword,phone})
await newUser.save()


//token
const adminToken = generateAdminToken(email, "admin");
// const token=generateUserToken(email)
// res.cookie("Admintoken", adminToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
res.cookie('Admintoken',adminToken)

            res.json({ success: true, message: "user created By admin is successfully" });
    } )

export const getAllUsers =asyncHandler (async (req, res, next) => {
  
        const users = await User.find().select('-password'); // Exclude passwords
        res.json({ success: true, message: 'Users list fetched successfully', data: users });
    } )

export const getAllUserById = asyncHandler(async (req, res, next) => {
  
        const { id } = req.params;
        const car = await User.findById(id).select('-password');
        // const users = await User.find() // Exclude passwords
        res.json({ success: true, message: 'Users list fetched successfully', data: car });
    } )

export const updateUser = asyncHandler(async (req, res, next) => {
   
        const { id } = req.params;
        const {name,email,phone } = req.body;
       
        const updatedUser = await User.findByIdAndUpdate(id, { name, email, phone }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, message: 'User updated successfully', data: updatedUser });
    } )

export const delteUser = asyncHandler(async (req, res, next) => {
   
        const { id } = req.params;
        const {name,email,phone } = req.body;
       
        const deletedUser = await User.findByIdAndDelete(id)
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, message: 'User deleted successfully', data: deletedUser });
    } )


export const getTotalUsers = async (req, res) => {
        try {
          const totalCars = await User.countDocuments(); // Counts total cars in the collection
          res.status(200).json({ total: totalCars });
        } catch (error) {
          res.status(500).json({ message: "Error fetching total cars" });
        }
      };
      





// Car Management Routes
export const adminCreateCar = asyncHandler(async (req, res, next) => {
    // Validate request body
    console.log(req.body); // Log the request body
    const { error } = createCarsValidation(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const { description,brand, model, year, pricePerDay, capacity, transmission, fuelType, mileage, color, registrationNumber, availability,Category,EngineCC,MaxPower,BootSpace,CylinderNo,Torque,FuelCapacity } = req.body;

    if (!req.file) {
        return res.status(400).json({ success: false, message: "Please upload an image" });
    }
    
    const existingCar = await Car.findOne({ model: model });
    if (existingCar) {
        return res.status(400).json({ success: false, message: "Car already exists" });
    }
    
    // Upload an image
    const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path, { folder: "car" });

    const newCar = new Car({description,brand, model, year, pricePerDay, capacity, transmission, fuelType, mileage, color, registrationNumber, availability,Category,EngineCC,MaxPower,BootSpace,CylinderNo,Torque,FuelCapacity });
    if (uploadResult?.url) {
        newCar.image = uploadResult.url;
    }
    
    await newCar.save();
    res.json({ success: true, message: 'New car created successfully!', data: newCar });
});


 export const updateCar = asyncHandler(async (req, res, next) => {
         const { id } = req.params;
     
         // Handle image update if a new file is provided
         let updatedData = { ...req.body };
         if (req.file) {
             const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path, { folder: "car" });
             if (uploadResult?.url) {
                 updatedData.image = uploadResult.url;
             }
         }
     
         // Update the car using findByIdAndUpdate
         const updatedCar = await Car.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
     
         if (!updatedCar) {
             return res.status(404).json({ success: false, message: "Car not found" });
         }
     
         res.json({ success: true, message: 'Car updated successfully!', data: updatedCar });
     });
     
 
 export const deleteCar = asyncHandler(async (req, res, next) => {
    
         const { id } = req.params;
         const deletedCar = await Car.findByIdAndDelete(id);
 
         if (!deletedCar) {
             return res.status(404).json({ success: false, message: 'Car not found' });
         }
 
         res.json({ success: true, message: 'Car deleted successfully!', data: deletedCar });
     } )
export const getAllCars = asyncHandler(async (req, res, next) => {
   
        const cars = await Car.find();
        res.json({ success: true, message: 'Cars list fetched successfully', data: cars });
    } )

export const getAllCarsById = asyncHandler(async (req, res, next) => {
    
        const { id } = req.params;
        const car = await Car.findById(id);
        if (!car) {
            return res.status(404).json({ success: false, message: 'Car not found' });
        }
        res.json({ success: true, message: 'Car fetched successfully', data: car });
    })


export const adminUpdateCar = asyncHandler(async (req, res, next) => {
   
    const { id } = req.params;
    
        // Handle image update if a new file is provided
        let updatedData = { ...req.body };
        if (req.file) {
            const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path, { folder: "car" });
            if (uploadResult?.url) {
                updatedData.image = uploadResult.url;
            }
        }
    
        // Update the car using findByIdAndUpdate
        const updatedCar = await Car.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
    
        if (!updatedCar) {
            return res.status(404).json({ success: false, message: "Car not found" });
        }
    
        res.json({ success: true, message: 'Car updated successfully!', data: updatedCar });
    });
    

export const adminDeleteCar = asyncHandler(async (req, res, next) => {
   
        const { id } = req.params;
        
        const deletedCar = await Car.findByIdAndDelete(id);
        if (!deletedCar) {
            return res.status(404).json({ success: false, message: 'Car not found' });
        }
        
        res.json({ success: true, message: 'Car deleted successfully', data: deletedCar });
    })


export const getTotalCars = async (req, res) => {
    try {
      const totalCars = await Car.countDocuments(); // Counts total cars in the collection
      res.status(200).json({ total: totalCars });
    } catch (error) {
      res.status(500).json({ message: "Error fetching total cars" });
    }
  };
  



// Booking Management Routes
export const getAllBookings = asyncHandler(async (req, res, next) => {
  
    const bookings = await Booking.find().populate("carId").populate("userId")
    res.json({ success: true, message: 'Booking list fetched', data: bookings });
})
export const getBookingId = asyncHandler(async (req, res, next) => {
  
        const { id } = req.params;
        const booking = await Booking.findById(id).populate('user car');
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        res.json({ success: true, message: 'Booking fetched successfully', data: booking });
    } )


export const bookingupdate = asyncHandler(async (req, res, next) => {
   
        const { error, value } = bookingSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }


        const { id } = req.params;
        const { user, car, startTime, startDate, endDate, endTime, totalPrice, pickupLocation, dropoffLocation } = req.body;
        const updatedBooking = await Booking.findByIdAndUpdate(id, {
            user, car, startTime, startDate, endDate, endTime, totalPrice, pickupLocation, dropoffLocation
        }, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        res.json({ success: true, message: 'Booking updated successfully', data: updatedBooking });
    } )

export const BookingDelete = asyncHandler(async (req, res, next) => {
  
        const { id } = req.params;
        const deletedBooking = await Booking.findByIdAndDelete(id);
        if (!deletedBooking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        res.json({ success: true, message: 'Booking deleted successfully', data: deletedBooking });
    } )

    export const confirmBooking = asyncHandler(async (req, res, next) => {
        const { bookingId } = req.params;
      
        const booking = await Booking.findById(bookingId).populate("carId").populate("userId")
        if (!booking) {
          return res.status(404).json({ success: false, message: "Booking not found" });
        }
      
        booking.status = 'Confirmed';
        booking.confirmedAt = new Date();
      
        await booking.save();
      
        res.status(200).json({ success: true, message: "Booking confirmed", data: booking });
      });


      export const cancelAdminBooking = asyncHandler(async (req, res, next) => {
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



      export const getTotalBooking = async (req, res) => {
        try {
          const totalCars = await Booking.countDocuments(); // Counts total cars in the collection
          res.status(200).json({ total: totalCars });
        } catch (error) {
          res.status(500).json({ message: "Error fetching total cars" });
        }
      };
      

      export const getBookingByuserIdssss = asyncHandler(async (req, res) => {
        const { userId } = req.params;
      
        // Find all bookings for the given userId
        const bookings = await Booking.find({ userId }); // Assuming userId is a field in your Booking model
      
        if (!bookings || bookings.length === 0) {
          return res.status(404).json({ success: false, message: "No bookings found for the provided User ID" });
        }
      
        res.status(200).json({ success: true, data: bookings });
      });
    

// Review Management Routes

export const adminGetCarReviews = asyncHandler(async (req, res) => {
    const reviewList = await Review.find().populate('user').populate('car')
    res.json({ success: true, message: 'Review list fetched', data: reviewList })
  })


export const adminGetCarReviewById = asyncHandler(async (req, res, next) => {
   
      const { id } = req.params;
      const reviewById = await Review.findById(id);
      
      if (!reviewById) {
        return res.status(404).json({ success: false, message: 'Review not found' });
      }
      
      res.json({ success: true, message: 'Review fetched successfully', data: reviewById });
    })


export const adminUpdateCarReview = asyncHandler(async (req, res, next) => {
   
      const { userId, carId, rating, reviewText } = req.body;
      const { id } = req.params;
  
      const updatedCarReview = await Review.findByIdAndUpdate(id, { user: userId, car: carId, rating, reviewText }, { new: true });
  
      if (!updatedCarReview) {
        return res.status(404).json({ success: false, message: 'Review not found' });
      } 
  
      res.json({ success: true, message: 'Review updated successfully!', data: updatedCarReview });
    })

export const adminDeleteCarReview = asyncHandler(async (req, res, next) => {
   
      const { id } = req.params;
      const deleteCarReview = await Review.findByIdAndDelete(id);
  
      if (!deleteCarReview) {
        return res.status(404).json({ success: false, message: 'Review not found' });
      }
  
      res.json({ success: true, message: 'Review deleted successfully!', data: deleteCarReview });
    } )

  export const getReviewByCarId = asyncHandler(async (req, res, next) => {
   
      const { car } = req.params;
  
      // Assuming carId is a field in the Review schema
      const reviews = await Review.find({ car });
  
      if (!reviews || reviews.length === 0) {
        return res.status(404).json({ success: false, message: 'No reviews found for this car' });
      }
  
      res.json({ success: true, message: 'Reviews fetched successfully', data: reviews });
    })
  

  export const getDriverListbyAdmin = asyncHandler(async (req, res, next) => {
    
        const carList = await Driver.find().populate('user')
            res.json({ success: true, message: 'Car list fetched', data: carList });
        })
    

        
export const getTotalReview = async (req, res) => {
    try {
      const totalReviews = await Review.countDocuments(); // Counts total cars in the collection
      res.status(200).json({ total: totalReviews });
    } catch (error) {
      res.status(500).json({ message: "Error fetching total review" });
    }
  };
  

  ///Contact


  export const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find().populate('userId');

    if (!contacts || contacts.length === 0) {
        return res.status(404).json({ success: false, message: "No contacts found" });
    }

    res.status(200).json({
        success: true,
        data: contacts,
    });
});



//payment


export const getAllAdminPayments = asyncHandler(async (req, res, next) => {
    try {
        // Retrieve all payment documents from MongoDB
        const payments = await Payment.find();

        // Check if there are any payments
        if (payments.length === 0) {
            return res.status(404).json({ success: false, message: 'No payments found' });
        }

        // Respond with all payment details
        res.status(200).json({ success: true, data: payments });
    } catch (error) {
        // Pass any unexpected errors to error-handling middleware
        next(error);
    }
});
