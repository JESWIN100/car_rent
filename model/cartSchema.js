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
}, {
    timestamps: true,
});

export const Cart = mongoose.model("Cart", cartSchema);
