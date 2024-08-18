import Joi from 'joi';

 export const bookingSchema = Joi.object({
    user: Joi.string().length(24).hex().required(), // Assuming user ID is a MongoDB ObjectId
    car: Joi.string().length(24).hex().required(), // Assuming car ID is a MongoDB ObjectId
    startDate: Joi.date().required(),
    startTime: Joi.string().pattern(/^\d{2}:\d{2}$/).required(), // Format: 'HH:MM'
    endDate: Joi.date().required(),
    endTime: Joi.string().pattern(/^\d{2}:\d{2}$/).required(), // Format: 'HH:MM'
    totalPrice: Joi.number().positive().required(),
    status: Joi.string().valid('Pending', 'Confirmed', 'Cancelled', 'Completed').default('Pending'),
    pickupLocation: Joi.string().required(),
    dropoffLocation: Joi.string().required(),
    paymentStatus: Joi.string().valid('Paid', 'Pending', 'Failed').default('Pending')
}).custom((value, helpers) => {
    if (new Date(value.startDate).getTime() > new Date(value.endDate).getTime()) {
        return helpers.message('Start date must be before end date');
    }
    return value;
}, 'Custom validation');

export default bookingSchema;
