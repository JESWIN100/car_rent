import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }],
}, {
    timestamps: true,
});

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);
