import { Request } from "express";
import { JwtUser } from "./auth.types";

export interface CustomRequest extends Request {
  jwtUser: string | JwtUser;
}
