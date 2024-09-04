
import Stripe from 'stripe';
import { asyncHandler } from '../utils/asyncHandler.js';

const stripe = new Stripe(process.env.Stripe_private_Api_Key);

export const MakePayment = asyncHandler(async (req, res, next) => {
    const { carDetails,totalAmount } = req.body;
    
   const lineItems = [{
    price_data: {
        currency: 'inr', // Currency set to Indian Rupees
        product_data: {
            name: `${carDetails.brand} ${carDetails.model}`, // The brand of the car (e.g., "BMW")
            description:`Booking: ${carDetails.availability}`, // The model of the car (e.g., "c3")
        },
        unit_amount: Math.round(totalAmount * 100), // The price is multiplied by 100 to convert to the smallest currency unit (e.g., paise for INR)
    },
    quantity: 1, // Quantity of the item being purchased
}];

    

    const session = await stripe.checkout.sessions.create({ // Corrected from session.create to sessions.create
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.CLIENT_DOMAIN}/payment/sucess`, // Fixed typo in URL path and ensured proper environment variable usage
        cancel_url: `${process.env.CLIENT_DOMAIN}/user/payment/cancel`,
    });

    res.json({ success: true, sessionId: session.id }); // Corrected spelling and moved this inside the asyncHandler function
});
