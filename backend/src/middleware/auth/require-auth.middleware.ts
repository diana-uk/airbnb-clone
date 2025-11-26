import { Request, Response, NextFunction } from "express";
import {
  APP_RESPONSE_CODE,
  AUTH_SCHEMA,
  UNAUTHORIZED,
} from "../../config/constants";
import { AppError } from "../../utils/AppError";
import { verifyToken } from "../../utils/jwt.util";
import { CustomRequest } from "../../types/request.types";
import { sendResponse } from "../../utils/send-response.utils";

// Check authentication function
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.get("authorization");
    // 1. If there's a missing header or doesn't start with Bearer -> return 401 Unauthorized
    if (!header?.startsWith(AUTH_SCHEMA)) {
      throw new AppError({
        errorMessage: UNAUTHORIZED,
        statusCode: APP_RESPONSE_CODE.UNAUTHORIZED,
      });
    }
    // 2. Remove unnecassary Bearer and spaces
    const jwtToken = header.slice(AUTH_SCHEMA.length).trim();

    console.log(
      "require-auth.middleware.ts, requireAuth; jwtToken: ",
      jwtToken
    );
    // 3. Veify Token
    const jwtTokenVerify = verifyToken(jwtToken);
    (req as CustomRequest).jwtUser = jwtTokenVerify;
    console.log("jwtTokenVerify: ", jwtTokenVerify);
    next();
  } catch (error) {
    sendResponse({
      res: res,
      status: APP_RESPONSE_CODE.UNAUTHORIZED,
      message: UNAUTHORIZED,
      success: false,
    });
    // throw new AppError("Unauthorized", 401);
  }
};
