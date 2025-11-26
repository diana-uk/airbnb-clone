import express from "express";

import { PropertyController } from "../controllers/PropertyController";
import { requireAuth } from "../middleware/auth/require-auth.middleware";
import { authorize } from "../middleware/auth/authorization.middleware";

export class propertyRoutes {
  private propertyController: PropertyController;
  public router = express.Router();

  constructor() {
    this.propertyController = new PropertyController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      "/",
      requireAuth,
      authorize("Host"),
      this.propertyController.createProperty
    );
  }
}
