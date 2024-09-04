import mongoose from "mongoose";

// Booking Schema
const bookingSchema = new mongoose.Schema({
    
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return this.endDate ? value < this.endDate : true;
            },
            message: "Start date must be before end date",
        },
    },
    startTime: {
        type: String, // e.g., 'HH:MM'
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    endTime: {
        type: String, // e.g., 'HH:MM'
        required: true,
    },

   
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
        default: 'Pending',
    },
    pickupLocation: {
        type: String,
        required: true,
    },
    dropoffLocation: {
        type: String,
        required: true,
    },
   
   
    paymentStatus: {
        type: String,
        enum: ['Paid', 'Pending', 'Failed'],
        default: 'Pending',
    },
}, {
    timestamps: true,
});

export const Booking = mongoose.model("Booking", bookingSchema);
