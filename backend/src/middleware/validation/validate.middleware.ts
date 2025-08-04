import { NextFunction, Request, Response } from "express";
import { registerValidationSchema } from "./register.validation";

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("🔍 VALIDATE REGISTER MIDDLEWARE STARTED");
  console.log("📝 Request body:", req.body);

  const { error, value } = registerValidationSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  console.log("✅ VALIDATION RESULT:", { error: error?.message, value });

  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path.join(""),
      message: detail.message,
    }));
    console.log("❌ VALIDATION ERRORS:", errors);

    res.status(400).json({
      success: false,
      error: errors,
    });
    return;
  }

  console.log("✅ VALIDATION PASSED - Proceeding to next middleware");
  req.body = value;
  next();
};
