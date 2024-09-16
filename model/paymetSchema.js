import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
    },
    carDetails: {
        carId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Car',
            required: true,
        },
        brand: String,
        model: String,
        availability: String,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        default: 'pending', // payment status can be 'pending', 'paid', 'failed'
    },
    confirmedAt: { // Added field to track payment confirmation date
        type: Date,
    },
}, {
    timestamps: true,
});

export const Payment = mongoose.model("Payment", paymentSchema);
