import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
    },
}, {
    timestamps: true,
});

export const Contact = mongoose.model("Contact", contactSchema);
