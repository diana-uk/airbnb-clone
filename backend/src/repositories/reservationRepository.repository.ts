import { App } from "../App";
import { APP_RESPONSE_CODE } from "../config/constants";
import { Reservation } from "../models/reservation.model";
import { AppError } from "../utils/AppError";

export class ReservationRepository {
    private dbConnectionInstance;
    constructor() {
        this.dbConnectionInstance = App.getDBInstance();
    }
    async createReservation(reservation: Reservation) {
        try {
            const dbConnection = await this.dbConnectionInstance;
            console.log(reservation.Id,
                reservation.PropertyId,
                reservation.UserId,
                reservation.PropertyTitle,
                reservation.StartDate,
                reservation.EndDate,
                reservation.NumberOfGuests,
                reservation.TotalPrice,
                reservation.Status)
            await dbConnection.execute(
                `INSERT INTO RESERVATIONS (Id, PropertyId, UserId, PropertyTitle, StartDate, EndDate, NumberOfGuests, TotalPrice, Status) VALUES (?,?,?,?,?,?,?,?,?)`,
                [
                    reservation.Id,
                    reservation.PropertyId,
                    reservation.UserId,
                    reservation.PropertyTitle,
                    reservation.StartDate,
                    reservation.EndDate,
                    reservation.NumberOfGuests,
                    reservation.TotalPrice,
                    reservation.Status,
                ]
            );
        } catch (error) {
            console.log(error)
            throw new AppError({
                errorMessage: "createReservation DB Error",
                statusCode: APP_RESPONSE_CODE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}