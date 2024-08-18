// adminJoiSchema.js
import Joi from 'joi';

export const adminCreateSchema = Joi.object({
    adminName: Joi.string().min(3).max(30).required().messages({
        'string.base': 'Admin name should be a string.',
        'string.empty': 'Admin name cannot be empty.',
        'string.min': 'Admin name should have a minimum length of 3.',
        'string.max': 'Admin name should have a maximum length of 30.',
        'any.required': 'Admin name is required.',
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'Email should be a string.',
        'string.empty': 'Email cannot be empty.',
        'string.email': 'Please enter a valid email address.',
        'any.required': 'Email is required.',
    }),
    password: Joi.string().min(6).required().messages({
        'string.base': 'Password should be a string.',
        'string.empty': 'Password cannot be empty.',
        'string.min': 'Password should have a minimum length of 6.',
        'any.required': 'Password is required.',
    }),
});

export const adminLoginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.base': 'Email should be a string.',
        'string.empty': 'Email cannot be empty.',
        'string.email': 'Please enter a valid email address.',
        'any.required': 'Email is required.',
    }),
    password: Joi.string().required().messages({
        'string.base': 'Password should be a string.',
        'string.empty': 'Password cannot be empty.',
        'any.required': 'Password is required.',
    }),
});
