import express from 'express';
import { createPayment, deleteAllPayments, deletePaymetById, getPaymentById, getPayments, updatePayments } from '../../controllers/paymentController.js';
import { authUser } from '../../middlewares/userAuth.js';






const router = express.Router();

 


router.post("/create",authUser,(createPayment))
router.get("/getRecept/:id",authUser,getPaymentById)
router.get("/getPayments",authUser,getPayments)
router.put("/update/:id",authUser,updatePayments)
router.delete("/delete/:id",authUser,deletePaymetById)
router.delete("/delteall",authUser,deleteAllPayments)








export default router;