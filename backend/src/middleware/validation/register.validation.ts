import Joi from "joi";

export const registerValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z\s]+$/)
    .required(),

  lastName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z\s]+$/)
    .required(),

  email: Joi.string().email().trim().min(2).max(50).required(),

  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .required(),

  phone: Joi.string()
    .trim()
    .pattern(/^\+?[\d\s\-()]+$/)
    .min(10)
    .max(20)
    .required(),

  type: Joi.string().valid("Host", "Guest").required(),
});
