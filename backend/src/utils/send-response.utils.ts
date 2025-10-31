import { Response } from "express";

export function sendResponse(
  res: Response,
  status: number,
  message: string,
  data: unknown,
  success: boolean = true
) {
  const payload = success ? { success, data, message } : { message };

  return res.status(status).json(payload);
}
