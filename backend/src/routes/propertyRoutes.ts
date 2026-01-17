import express from "express";

import { PropertyController } from "../controllers/PropertyController";
import { requireAuth } from "../middleware/auth/require-auth.middleware";
import { authorize } from "../middleware/auth/authorization.middleware";
import { createUpdatePropertySchema } from "../validator/property.validators";
import { validateRequest } from "../validator/validateRequest";
import { ReservationController } from "../controllers/ReservationController";

export class propertyRoutes {
  private propertyController: PropertyController;
  private reservationController: ReservationController;
  public router = express.Router();

  constructor() {
    this.propertyController = new PropertyController();
    this.reservationController = new ReservationController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      "/",
      requireAuth,
      authorize("Host"),
      this.propertyController.createProperty.bind(this.propertyController)
    );
    this.router.put(
      "/:id",
      requireAuth,
      authorize("Host"),
      validateRequest(createUpdatePropertySchema),
      this.propertyController.updateProperty.bind(this.propertyController)
    );
    this.router.post("/:id/reservation", requireAuth, this.reservationController.createReservation.bind(this.reservationController))
  }
}
