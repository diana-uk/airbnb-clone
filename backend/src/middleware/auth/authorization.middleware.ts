import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../../types/request.types";
import { JwtUser } from "../../types/auth.types";
import { sendResponse } from "../../utils/send-response.utils";
import { APP_RESPONSE_CODE, FORBIDDEN } from "../../config/constants";

export const authorize = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const customRequest = req as CustomRequest;
    const jwtUser = customRequest.jwtUser as JwtUser;
    if (!jwtUser || !allowedRoles.includes(jwtUser.Type)) {
      sendResponse({
        res: res,
        status: APP_RESPONSE_CODE.FORBIDDEN,
        message: FORBIDDEN,
        success: false,
      });
    }
    next();
  };
};
