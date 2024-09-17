import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    image: {
        type: String, // Updated to an array of strings to support multiple image URLs
        
    
      },
    isAdmin: {
        type: Boolean,
        default: false,
    }, 
}, {
    timestamps: true,
});

export const User = mongoose.model("User", userSchema);
