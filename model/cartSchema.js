import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    cars: [
        {
            car: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Car',
                required: true,
            },
            startDate: {
                type: Date,
                required: true,
            },
            endDate: {
                type: Date,
                required: true,
            },
            pricePerDay: {
                type: Number,
                required: true,
            },
            totalPrice: {
                type: Number,
                required: true,
            },
        }
    ],
    totalCartPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1,
    },
    totalCartPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    discount: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending',
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending',
    },
    paymentDetails: {
        transactionId: {
            type: String,
        },
        paymentMethod: {
            type: String,
            enum: ['card', 'paypal', 'bank_transfer'],
        },
    },
    expiresAt: {
        type: Date,
        default: () => Date.now() + 24 * 60 * 60 * 1000, // Expires in 24 hours
    },
}, {
    timestamps: true,
});

export const Cart = mongoose.model("Cart", cartSchema);
