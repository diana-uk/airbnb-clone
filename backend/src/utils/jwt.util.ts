import jwt from "jsonwebtoken";
import { JwtUser } from "../types/auth.types";

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });
};

export const verifyToken = (jwtToken: string) => {
  return jwt.verify(jwtToken, process.env.JWT_SECRET!) as JwtUser;
};
