import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

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
      res
        .status(201)
        .json({
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
}
