import express, { Application, Request, Response } from "express";
import { AuthController } from "../controllers/AuthController";
import { validateRegister } from "../middleware/validation/validate.middleware";

//TODO 6: Try to run first without class then see if it works

export class UserRoutes {
  private authController: AuthController;
  router = express.Router();

  constructor() {
    console.log("hi");
    this.authController = new AuthController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      "/register",
      validateRegister,
      this.authController.registerUser
    );
  }
}
