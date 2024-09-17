import Stripe from 'stripe';
import { asyncHandler } from '../utils/asyncHandler.js';
import { Payment } from '../model/paymetSchema.js';
import { Booking } from '../model/bookingSchema.js';
const stripe = new Stripe(process.env.Stripe_private_Api_Key);

export const MakePayment = asyncHandler(async (req, res, next) => {
    const { carDetails, totalAmount } = req.body;
    
    if (!carDetails ||  !totalAmount) {
        return res.status(400).json({ success: false, message: 'Missing car details or total amount' });
    }
    
    const lineItems = [{
        price_data: {
            currency: 'inr',
            product_data: { 
                name: `${carDetails.brand} ${carDetails.model}`,
                description: `Booking: ${carDetails.availability}`,
            },
            unit_amount: Math.round(totalAmount * 100), // Convert amount to smallest currency unit
        },
        quantity: 1,
    }];

    try {
            const session = await stripe.checkout.sessions.create({ 
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.CLIENT_DOMAIN}/payment/sucess`, 
        cancel_url: `${process.env.CLIENT_DOMAIN}/payment/failed`,
    });

        // Save payment details to MongoDB
        const payment = new Payment({
            sessionId: session.id,
            carDetails: {
                carId: carDetails._id,
                brand: carDetails.brand,
                model: carDetails.model,
                availability: carDetails.availability,
            },
            totalAmount: totalAmount,
            paymentStatus: 'pending', // Initially set to 'pending'
        });

        await payment.save();

        res.json({ success: true, sessionId: session.id });
    } catch (error) {
        next(error);
    }
});






export const getAllPayments = asyncHandler(async (req, res, next) => {
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







// export const confirmPayment = asyncHandler(async (req, res, next) => {
//     const { paymentId } = req.params;

//     try {
//         // Find the payment document by ID
//         const payment = await Payment.findById(paymentId);

//         // Check if payment is found
//         // if (!payment) {
//         //     return res.status(404).json({ success: false, message: "Payment not found" });
//         // }

//         // Update payment status and confirmation date
//         payment.paymentStatus = 'paid'; // Correct field name
//         payment.confirmedAt = new Date();

//         // Save updated payment document
//         await payment.save();

//         // Respond with success
//         res.status(200).json({ success: true, message: "Payment confirmed", data: payment });
//     } catch (error) {
//         // Pass any unexpected errors to error-handling middleware
//         next(error);
//     }
// });


export const getPaymentsByCarId = asyncHandler(async (req, res, next) => {
    const { carId } = req.params;

    try {
        // Find all payments related to the given carId
        const payments = await Payment.find({ 'carDetails.carId': carId });

        if (payments.length === 0) {
            return res.status(404).json({ success: false, message: 'No payments found for this car' });
        }

        // Respond with the payment data
        res.status(200).json({ success: true, data: payments });
    } catch (error) {
        // Pass any unexpected errors to error-handling middleware
        next(error);
    }
});


export const confirmPayment = asyncHandler(async (req, res, next) => {
    const { bookingId } = req.params;
  
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
  
    booking.paymentStatus = 'Paid';
    booking.confirmedAt = new Date();
  
    await booking.save();
  
    res.status(200).json({ success: true, message: "Payment confirmed", data: booking });
  });