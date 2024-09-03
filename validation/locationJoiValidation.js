import Joi from "joi";

// Joi schema for location validation
export const locationSchema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postalCode: Joi.string().pattern(/^[1-9][0-9]{5}$/).message('Invalid PIN code!'),
    country: Joi.string().required(),
});
