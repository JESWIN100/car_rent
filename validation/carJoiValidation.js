import Joi from 'joi';

export const createCarsValidation = (data) => {
  const schema = Joi.object({
    brand: Joi.string().required(),
    model: Joi.string().required(),
    year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
    image: Joi.array().items(Joi.string().uri()).required(),
    pricePerDay: Joi.number().positive().required(),
    capacity: Joi.number().integer().positive().required(),
    transmission: Joi.string().valid('Automatic', 'Manual').required(),
    fuelType: Joi.string().valid('Petrol', 'Diesel', 'Electric', 'Hybrid').required(),
    mileage: Joi.number().positive().required(),
    color: Joi.string().required(),
    registrationNumber: Joi.string().required(),
    availability: Joi.boolean().required(),
  });

  return schema.validate(data);
};
