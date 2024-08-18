
import express from "express";
import { AdminCreate, adminCreateCar, adminDeleteCar, adminGetCarReviewById, adminGetCarReviews,
     adminLogin, AdminLogout, adminProfile,checkAdmin,
      adminUpdateCar, delteUser, updateUser,
       BookingDelete, bookingupdate, getAllBookings, 
         getAllCars, getAllCarsById, getAllUserById, getAllUsers, getBookingId, 
         adminUpdateCarReview,
         adminDeleteCarReview,
         AdminUserCreate,
         getReviewByCarId} from "../../controllers/admincontroller.js";
         
import verifyAdminToken from '../../middlewares/authAdmin.js'
const router = express.Router();

// Protect all admin routes with the verifyAdminToken middleware


// Admin creation route
router.post("/create", AdminCreate);
router.post("/login",adminLogin);
router.use("/",verifyAdminToken)
router.get("/adminById/:id",adminProfile)
router.post("/logout",AdminLogout)

router.get("/check-admin",checkAdmin)


// User Management Routes
router.post("/createuserByAd",AdminUserCreate)
router.get("/users",getAllUsers)
router.get("/userById/:id",getAllUserById)
router.put("/userUpdate/:id",updateUser) 
router.delete("/userByDelete/:id",delteUser)


// Car Management Routes
router.post("/create",adminCreateCar)
router.get("/cars",getAllCars);
router.get('/carsById/:id',getAllCarsById)
router.put('/carUpdate/:id',adminUpdateCar)
router.delete("/carDelete/:id",adminDeleteCar)

// Booking Management Routes
router.get("/bookings", getAllBookings);
router.get("/bookingsById/:id", getBookingId);
router.put("/bookingUpdate/:id", bookingupdate);
router.delete("/deletBooking/:id",BookingDelete);


// Review Management Routes
router.get("/reviews",adminGetCarReviews)
router.get("/reviewById/:id",adminGetCarReviewById)
router.get("/getbycarid/:car",getReviewByCarId)
router.put("/updateReview/:id",adminUpdateCarReview)
router.delete("/deleteReview/:id",adminDeleteCarReview)




export default router;
