import express, { Application, Request, Response } from "express";
import { AuthController } from "../controllers/AuthController";
import { checkDuplicateEmail } from "../middleware/security/duplicate-check.middleware";

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
      checkDuplicateEmail,
      this.authController.registerUser
    );

    this.router.get("/login", this.authController.login);
  }
}
