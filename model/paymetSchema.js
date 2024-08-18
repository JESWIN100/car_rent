import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'Debit Card', 'PayPal', 'Net Banking'],
        required: true,
    },
    transactionId: {
        type: String,
        unique: true,
        required: true,
    },
    currency: {
        type: String,
        default: 'IND',
    },
    paymentDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['Success', 'Failed', 'Pending'],
        default: 'Pending',
    },
    description: {
        type: String,
    },
    receiptUrl: {
        type: String,
    },
}, {
    timestamps: true,
});

paymentSchema.index({ booking: 1 });

export const Payment = mongoose.model("Payment", paymentSchema);
