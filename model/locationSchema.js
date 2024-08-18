import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        index: true, // Adding index for faster search
    }, 
    state: {
        type: String,
        required: [true, 'State is required'],
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
    },
    postalCode: {
        type: String,
        required: [true, 'Postal code is required'],
        validate: {
            validator: function(v) {
                return /^[0-9]{6}$/.test(v); // Validation for 6-digit Indian PIN codes
            },
            message: props => `${props.value} is not a valid PIN code!`
        }
    }
    
}, {
    timestamps: true,
});

export const Location = mongoose.model("Location", locationSchema);
