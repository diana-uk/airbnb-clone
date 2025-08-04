import { Request, Response } from "express";
import { UserRespository } from "../../repositories/user.repository";

export const checkDuplicateEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        success: false,
        error: "Email is required.",
      });
    }

    const userRepository = new UserRespository();
    // TODO 7: Add here call to findByEmail function

    // TODO 8: If email exists response status is 409 with message
  } catch (error) {
    console.error("Error checking duplicate email: ", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
