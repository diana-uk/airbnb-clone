import { ReservationController } from "../controllers/ReservationController";
import { Router } from "express";

export class ReservationRoutes {
    private reservationController: ReservationController;
    public router = Router();

    constructor() {
        this.reservationController = new ReservationController();
        this.initalizeRoutes();
    }

    private initalizeRoutes() {
        // Get All Reservations by Guest (GET /reservations/guest/{userId}) ENDPOINT
    }
}