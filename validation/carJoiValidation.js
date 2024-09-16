import Joi from 'joi';

export const createCarsValidation = (data) => {
    const schema = Joi.object({
        brand: Joi.string().required(),
        model: Joi.string().required(),
        year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
        pricePerDay: Joi.number().positive().required(),
        capacity: Joi.number().integer().positive().required(),
        transmission: Joi.string().valid('Automatic', 'Manual').required(),
        fuelType: Joi.string().valid('Petrol', 'Diesel', 'Electric', 'Hybrid').required(),
        mileage: Joi.number().positive().required(),
        color: Joi.string().required(),
        registrationNumber: Joi.string().required(),
        availability: Joi.boolean().required(),
        review:Joi.string(),
        description:Joi.string().required(),
        Category: Joi.string()
        .valid(
          'Sedan',
          'Luxury',
          'SUV',
          'Hybrid',
          'Coupe',
          'Convertible',
          'Wagon',
          'Pickup Truck',
          'Minivan',
          'Sports Car',
          'Electric',
          'Luxury SUV',
          'Hybrid SUV',
          "Hatchback",
        )
        .required(),
        EngineCC: Joi.number().positive().required(),
//   MaxPower: Joi.number().positive().required(),
  BootSpace: Joi.number().positive().required(),
//   CylinderNo: Joi.number().integer().positive().required(),
  Torque: Joi.number().positive().required(),
  FuelCapacity: Joi.number().positive().required(),
    });

    return schema.validate(data);
};
