import { Request, Response, NextFunction } from "express";
import { AUTH_SCHEMA } from "../../config/constants";
import { AppError } from "../../utils/AppError";
import { verifyToken } from "../../utils/jwt.util";
import { CustomRequest } from "../../types/request.types";

// Check authentication function
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.get("authorization");
    // 1. If there's a missing header or doesn't start with Bearer -> return 401 Unauthorized
    if (!header?.startsWith(AUTH_SCHEMA))
      return new AppError("Unauthorized", 401);
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
    res.status(401).json({ message: "Unauthorized" });
    // throw new AppError("Unauthorized", 401);
  }
};
