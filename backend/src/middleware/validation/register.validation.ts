import Joi from "joi";

// TODO [BNB-13] Change registerValidationSchema to use ZOD libray and put it in the validators folder
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
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required(),

  phone: Joi.string()
    .trim()
    .pattern(/^\+?[\d\s\-()]+$/)
    .min(10)
    .max(20)
    .required(),

  type: Joi.string().valid("Host", "Guest").required(),
});
