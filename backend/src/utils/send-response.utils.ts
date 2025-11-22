import { Response } from "express";
import { AppSuccess } from "./AppSuccess";
import { AppError } from "./AppError";

export function sendResponse({
  res,
  status,
  message,
  data,
  success = true,
}: {
  res: Response;
  status: number;
  message?: string;
  data?: any;
  success: boolean;
}) {
  const payload = success
    ? new AppSuccess({
        data: data,
        message: message,
        statusCode: status,
      })
    : new AppError({
        errorMessage: message,
        statusCode: status,
      });

  return res.status(status).json(payload);
}
