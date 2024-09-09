
import express from "express";
import { AdminCreate, adminCreateCar, adminDeleteCar, adminGetCarReviewById, adminGetCarReviews,
     adminLogin, AdminLogout, adminProfile,checkAdmin,
      adminUpdateCar, delteUser, updateUser,
       BookingDelete, bookingupdate, getAllBookings, 
         getAllCars, getAllCarsById, getAllUserById, getAllUsers, getBookingId, 
         adminUpdateCarReview,
         adminDeleteCarReview,
         AdminUserCreate,
         getReviewByCarId,
         getTotalCars,
         confirmBooking,
         getTotalBooking,
         getTotalUsers,
         getDriverListbyAdmin,
         getTotalReview} from "../../controllers/admincontroller.js";
         
import verifyAdminToken from '../../middlewares/authAdmin.js'
import { upload } from "../../middlewares/uploadMidlleware.js";
import { deleteDriver } from "../../controllers/driverController.js";
const router = express.Router();

// Protect all admin routes with the verifyAdminToken middleware


// Admin creation route
router.post("/create", AdminCreate);
router.post("/login",adminLogin);
router.get("/check-admin",checkAdmin)

// router.use(verifyAdminToken);

router.get("/adminById/:id",adminProfile)
router.post("/logout",AdminLogout)



// User Management Routes
router.post("/createuserByAd",AdminUserCreate)
router.get("/users",getAllUsers)
router.get("/userById/:id",getAllUserById)
router.put("/userUpdate/:id",updateUser) 
router.delete("/userByDelete/:id",delteUser)
router.get('/totalusers', getTotalUsers);

// Car Management Routes
router.post("/createCar",upload.single('image'),adminCreateCar)
router.get("/cars",verifyAdminToken,getAllCars);
router.get('/carsById/:id',getAllCarsById)
router.put('/carUpdate/:id',upload.single('image'),adminUpdateCar)
router.delete("/carDelete/:id",adminDeleteCar)
router.get('/total', getTotalCars);

// Booking Management Routes
router.get("/bookings", getAllBookings);
router.get("/bookingsById/:id", getBookingId);
router.put("/bookingUpdate/:id", bookingupdate);
router.delete("/deletBooking/:id",BookingDelete);
router.get('/totalBooking', getTotalBooking);

//confirm
router.put('/Adminbooking/:bookingId/confirm', confirmBooking);

// Review Management Routes
router.get("/reviews",adminGetCarReviews)
router.get("/reviewById/:id",adminGetCarReviewById)
router.get("/getbycarid/:car",getReviewByCarId)
router.put("/updateReview/:id",adminUpdateCarReview)
router.delete("/deleteReview/:id",adminDeleteCarReview)
router.get('/totalReview', getTotalReview);




//Driver Managament Routes

router.get('/driverlist', (getDriverListbyAdmin));




export default router;
