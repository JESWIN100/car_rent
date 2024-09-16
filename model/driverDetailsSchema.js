import mongoose from "mongoose";

// Driver Schema
const driverSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        
    },
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        minlength: [2, 'First name must be at least 2 characters long'],
        maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        minlength: [2, 'Last name must be at least 2 characters long'],
        maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    driverAge: {
        type: Number,
        required: [true, 'Driver age is required'],
        min: [18, 'Driver must be at least 18 years old'],
        max: [75, 'Driver cannot be older than 75 years']
    },
    mobileNumber: {
        type: String,
        required: [true, 'Mobile number is required'],
        match: [/^\d{10}$/, 'Mobile number must be a valid 10-digit number']
    },
    licenceNumber: {
        type: String,
        required: [true, 'Licence number is required'],
        trim: true,
        // unique: true,
        match: [/^[A-Z0-9-]{6,15}$/, 'Licence number must be alphanumeric and between 6 to 15 characters']
    },
    lockUntil: { type: Date, default: null },
}, {
    timestamps: true,
});

export const Driver = mongoose.model("Driver", driverSchema);
