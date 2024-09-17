import express from 'express';
import {  confirmPayment, getAllPayments, getPaymentsByCarId, MakePayment } from '../../controllers/paymentController.js'; // Importing as named export
import { authUser } from '../../middlewares/userAuth.js';
const router = express.Router();

 router.post("/create-checkout-session",authUser, MakePayment); // Added authUser middleware
 router.put('/Adminbooking/:bookingId/confirm',authUser, confirmPayment);
 router.get('/payments',authUser, getAllPayments); 
 router.get('/payments/car/:carId',authUser, getPaymentsByCarId);
//  router.get('/getPayment/:paymentId', getPaymentDetails);
// Uncomment or remove these routes based on your use case
// router.post("/create", authUser, createPayment);
// router.get("/getRecept/:id", authUser, getPaymentById);
// router.get("/getPayments", authUser, getPayments);
// router.put("/update/:id", authUser, updatePayments);
// router.delete("/delete/:id", authUser, deletePaymentById);
// router.delete("/deleteall", authUser, deleteAllPayments);

export default router;
