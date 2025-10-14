import { NextFunction, Request, Response } from "express";
import { UserRespository } from "../../repositories/user.repository";
import { UserService } from "../../services/UserService";

export const checkDuplicateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Email is required.",
      });
    }

    // TODO: MAKE A CONSTURCTOR OR GENERIC BOOTSTRAP
    const userService = new UserService();

    const emailExists = await userService.findByEmail(email);

    if (emailExists) {
      return res.status(409).json({
        success: false,
        error: "Email address already exists !",
      });
    }
    next();
  } catch (error) {
    console.error("Error checking duplicate email: ", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
