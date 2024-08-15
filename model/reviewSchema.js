// Review Schema
const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    review: {
        type: String,
        required: true,
        minlength: 15,
        maxlength: 200,
    },
}, {
    timestamps: true,
});

// // Ensure each user can only review each car once
// reviewSchema.index({ user: 1, car: 1 }, { unique: true });

// // Optional: Add indexes for faster querying by user or car
// reviewSchema.index({ user: 1 });
// reviewSchema.index({ car: 1 });

// // Optional: Pre-save hook to sanitize review content
// reviewSchema.pre('save', function(next) {
//     this.review = this.review.trim();
//     next();
// });

export const Review = mongoose.model("Review", reviewSchema);