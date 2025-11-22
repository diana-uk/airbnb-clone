import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { AppError } from "../utils/AppError";
import { CustomRequest } from "../types/request.types";
import { JwtUser } from "../types/auth.types";
import { sendResponse } from "../utils/send-response.utils";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public registerUser = async (req: Request, res: Response) => {
    try {
      // We already did validation in the middleware at this point
      const { firstName, lastName, email, password, phone, type } = req.body;

      const createdUser = await this.authService.registerUser(
        firstName,
        lastName,
        email,
        password,
        phone,
        type
      );

      // TODO 4: Add function to create this json for success
      res.status(201).json({
        success: true,
        data: createdUser,
        message: "User created successfully!",
      });
    } catch (error) {
      // TODO 2: Check if success false here is needed
      // TODO 3: Add function to create this json for error
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
    }
  };

  // Controller -> Service -> Repository/Model -> Database
  public login = async (req: Request, res: Response) => {
    try {
      // TODO Login.1: Add middleware to check for the password and email if they are valid or not
      // We already did validation in the middleware at this point (check for the)
      const { email, password } = req.body;
      // TODO Login.2: Authenticate by calling the service which returns the user with the jwt
      const userWithJwt = await this.authService.login(email, password);

      res.status(200).json({
        success: true,
        data: userWithJwt,
        message: "User logged in successfully!",
      });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          error: error.message,
          data: error.data,
        });
      }
      // TODO 6: Create generic error
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
    }
  };

  public getUser = async (req: Request, res: Response) => {
    try {
      // 1. Get the JWT Payload
      const { jwtUser } = req as CustomRequest;

      const currentUser = await this.authService.getUser(jwtUser as JwtUser);

      res.status(200).json({
        success: true,
        data: currentUser,
        message: "Extracted user data from JWT successfully !",
      });
    } catch (error) {
      if (error instanceof AppError) {
        const appError = error as AppError<any>;
        // TODO: MAKE IT GENERIC THE RES.STATUS OF ERROR

        return sendResponse({
          res: res,
          status: appError.statusCode,
          message: appError.errorMessage,
          success: false,
        });
      }
      res.status(401).json({
        errorMessage: "Unauthorized",
      });
    }
  };
}
