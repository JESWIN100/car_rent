
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
         getTotalReview,
         getBookingByuserIdssss,
         getAllAdminPayments,
         cancelAdminBooking} from "../../controllers/admincontroller.js";
         
import verifyAdminToken from '../../middlewares/authAdmin.js'
import { upload } from "../../middlewares/uploadMidlleware.js";
import { deleteDriver } from "../../controllers/driverController.js";
import { getContacts } from "../../controllers/contactController.js";
const router = express.Router();

// Protect all admin routes with the verifyAdminToken middleware


// Admin creation route
router.post("/create", AdminCreate);
router.post("/login",adminLogin);
router.get("/check-admin",verifyAdminToken,checkAdmin)

// router.use('/'verifyAdminToken);

router.get("/adminById/:id",verifyAdminToken,adminProfile)
router.post("/logout",verifyAdminToken,AdminLogout)



// User Management Routes
router.post("/createuserByAd",verifyAdminToken,AdminUserCreate)
router.get("/users",verifyAdminToken,getAllUsers)
router.get("/userById/:id",verifyAdminToken,getAllUserById)
router.put("/userUpdate/:id",verifyAdminToken,updateUser) 
router.delete("/userByDelete/:id",verifyAdminToken,delteUser)
router.get('/totalusers',verifyAdminToken, getTotalUsers);

// Car Management Routes
router.post("/createCar",upload.single('image'),verifyAdminToken,adminCreateCar)
router.get("/cars",verifyAdminToken,getAllCars);
router.get('/carsById/:id',verifyAdminToken,getAllCarsById)
router.put('/carUpdate/:id',upload.single('image'),verifyAdminToken,adminUpdateCar)
router.delete("/carDelete/:id",verifyAdminToken,adminDeleteCar)
router.get('/total',verifyAdminToken, getTotalCars);

// Booking Management Routes
router.get("/bookings",verifyAdminToken, getAllBookings);
router.get("/bookingsById/:id",verifyAdminToken, getBookingId);
router.put("/bookingUpdate/:id",verifyAdminToken, bookingupdate);
router.delete("/deletBooking/:id",verifyAdminToken,BookingDelete);
router.get('/totalBooking', verifyAdminToken,getTotalBooking);
router.get("/carUser/:userId",verifyAdminToken,(getBookingByuserIdssss));
//confirm
router.put('/Adminbooking/:bookingId/confirm', confirmBooking);
router.put('/bookings/:bookingId/cancel', cancelAdminBooking);
// Review Management Routes
router.get("/reviews",verifyAdminToken,adminGetCarReviews)
router.get("/reviewById/:id",verifyAdminToken,adminGetCarReviewById)
router.get("/getbycarid/:car",verifyAdminToken,getReviewByCarId)
router.put("/updateReview/:id",verifyAdminToken,adminUpdateCarReview)
router.delete("/deleteReview/:id",verifyAdminToken,adminDeleteCarReview)
router.get('/totalReview', verifyAdminToken,getTotalReview);




//Driver Managament Routes

router.get('/driverlist', verifyAdminToken,(getDriverListbyAdmin));



//contact 

router.get('/contactlist',verifyAdminToken, (getContacts));


//payment
router.get('/payments', getAllAdminPayments); 


export default router;
