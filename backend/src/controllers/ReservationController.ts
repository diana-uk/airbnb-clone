import { Request, Response } from "express";
import { ReservationService } from "../services/ReservationService";
import { AppError } from "../utils/AppError";
import { sendResponse } from "../utils/send-response.utils";
import { APP_RESPONSE_CODE, FAILED_TO_CREATE_RESERVATION } from "../config/constants";
import { CreateReservationRequestDto } from "../models/reservation.model";
import { CustomRequest } from "../types/request.types";
import { JwtUser } from "../types/auth.types";

export class ReservationController {
    private reservationService: ReservationService;
    constructor() {
        this.reservationService = new ReservationService();
    }
    public async createReservation(req: Request, res: Response) {
        try {
            console.log('hellllo')
            const propertyId = req.params.id;
            // TODO Optimize the 2 lines below
            const jwtUser = (req as CustomRequest).jwtUser;
            const userId = (jwtUser as JwtUser).Id;

            const resevationDto: CreateReservationRequestDto = req.body;
            console.log('hellllo1')

            const createdReservation = await this.reservationService.createReservation({ propertyId: propertyId, reservationDto: resevationDto, userId: userId })
            console.log('hellllo2')

            if (createdReservation == null) {
                return sendResponse({
                    res: res,
                    status: APP_RESPONSE_CODE.INTERNAL_SERVER_ERROR,
                    message: FAILED_TO_CREATE_RESERVATION,
                    success: false,
                });
            }
            return sendResponse({
                res: res,
                status: APP_RESPONSE_CODE.SUCCESS,
                data: createdReservation,
                success: true,
            });
        } catch (error) {
            if (error instanceof AppError) {
                sendResponse({
                    res: res,
                    status: error.statusCode,
                    message: error.message,
                    success: false
                })
            }
            return sendResponse({
                res: res,
                status: APP_RESPONSE_CODE.INTERNAL_SERVER_ERROR,
                success: false,
            });
        }
    }
}