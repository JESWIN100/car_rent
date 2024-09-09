import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  // bookings: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Booking',
  // },
  review: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  image: {
    type: [String], // Updated to an array of strings to support multiple image URLs
    required: true,

  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  transmission: {
    type: String,
    required: true,
    enum: ['Automatic', 'Manual'],
  },
  fuelType: {
    type: String,
    required: true,
    enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
  },
  mileage: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  description:{
    type:String,
    required:true
    },

}, {
  timestamps: true,
});

export const Car = mongoose.model("Car", carSchema);
