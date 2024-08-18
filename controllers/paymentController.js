import { Payment } from "../model/paymetSchema.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { paymentSchema } from "../validation/paymentJoiSchema.js";


export const createPayment = asyncHandler(async (req, res) => {
    // Validate request body using Joi
    const { error } = paymentSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            errors: error.details.map(err => err.message)
        });
    }

    const { booking, amount, paymentMethod, transactionId, description } = req.body;

    const existingPayment = await Payment.findOne({ transactionId });
    if (existingPayment) {
        return res.status(400).json({ success: false, message: "Payment already exists" });
    }

    const newPayment = new Payment({ booking, amount, paymentMethod, transactionId, description });
    await newPayment.save();

    res.json({ success: true, message: 'Payment transaction successfully completed!', data: newPayment });
});

export const getPaymentById = asyncHandler( async (req, res, next) => {
   
        const { id } = req.params;
        const Payement = await Payment.findById(id).populate("booking")
        
        if (!Payement) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }
        
        res.json({ success: true, message: 'payment details successfully getted', data: Payement });
    })

export const getPayments = asyncHandler(async (req, res, next) => {
  
        const bookings = await Payment.find()
            .populate('booking')
           
        
        res.status(200).json({
            success: true,
            message: 'Payment booking list fetched successfully',
            data: bookings
        });
    });

export const updatePayments = asyncHandler(async (req, res) => {
        // Validate request body using Joi
        const { error } = paymentSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.details.map(err => err.message)
            });
        }
    
        const { booking, amount, paymentMethod, transactionId, description } = req.body;
        const { id } = req.params;
    
        const updatedPayment = await Payment.findByIdAndUpdate(
            id,
            { booking, amount, paymentMethod, transactionId, description },
            { new: true }
        );
    
        if (!updatedPayment) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }
    
        res.json({ success: true, message: 'Payment updated successfully!', data: updatedPayment });
    });
    
  export const deletePaymetById = asyncHandler(async (req, res, next) => {
        const { id } = req.params;
        const deletePaymetById = await Payment.findByIdAndDelete(id);
        
        if (!deletePaymetById) {
            return res.status(404).json({ success: false, message: 'payment not found' });
        }
        
        res.json({ success: true, message: 'payment deleted successfully!', data: deletePaymetById });
     })

export const deleteAllPayments = asyncHandler(async (req, res, next) => {
    // Delete all payments
    const result = await Payment.deleteMany({});

    // Check if any payments were deleted
    if (result.deletedCount === 0) {
        return res.status(404).json({ success: false, message: 'No payments found to delete' });
    }
    
    res.json({ success: true, message: 'All payments deleted successfully!' });
}); 