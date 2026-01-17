import { CreateReservationRequestDto } from "../models/reservation.model";
import { randomUUID } from "crypto";
import { ReservationRepository } from "../repositories/reservationRepository.repository";
import { AppError } from "../utils/AppError";
import { APP_RESPONSE_CODE } from "../config/constants";
import { PropertyRepository } from "../repositories/propertyRespository.respository";
import { PropertyMapper } from "../mappers/ProopertyMapper.mappers";

export class ReservationService {
    private reservationRepository: ReservationRepository;
    private propertyRepository: PropertyRepository;

    constructor() {
        this.reservationRepository = new ReservationRepository();
        this.propertyRepository = new PropertyRepository();
    }

    public async createReservation({ propertyId, reservationDto, userId }: { propertyId: string, reservationDto: CreateReservationRequestDto, userId: string }) {
        try {
            // Get Property to get original PricePerNight
            const propertyOfReservation = await this.propertyRepository.findPropertyById(propertyId);
            if (!propertyOfReservation) {
                throw new AppError({
                    errorMessage: `Property ID ${propertyId} does not exist`,
                    statusCode: APP_RESPONSE_CODE.NOT_FOUND,
                });
            }
            const propertyDto = PropertyMapper.toResponseDto(propertyOfReservation)
            const propertyMaxGuests = propertyDto.maxGuests;

            if (propertyMaxGuests < reservationDto.numberOfGuests) {
                throw new AppError({
                    errorMessage: `Property can contain up to ${propertyMaxGuests}`,
                    statusCode: APP_RESPONSE_CODE.BAD_RESPONSE,
                });
            }
            console.log('property:Id, ', propertyId)
            // TODO Check what's the difference between crypto uuid (is it built in ?) and the UUIDV4
            const reservationId = randomUUID();

            const originalPricePerNight = propertyOfReservation?.PricePerNight;

            const totalNumberOfNights = this.calculateTotalNumberOfNights({ startDate: reservationDto.startDate, endDate: reservationDto.endDate });
            const totalPriceCalculation = this.calculateTotalPrice({ totalNumberOfNights: totalNumberOfNights, originalPricePerNight: originalPricePerNight ?? 0, discountPercent: reservationDto.discountPercent })

            // TODO: Convert status to the enum type

            const reservation = {
                Id: reservationId,
                PropertyId: propertyId,
                PropertyTitle: reservationDto.propertyTitle,
                StartDate: reservationDto.startDate,
                EndDate: reservationDto.endDate,
                NumberOfGuests: reservationDto.numberOfGuests,
                TotalPrice: Number(totalPriceCalculation),
                Status: "Created",
                UserId: userId
            }

            await this.reservationRepository.createReservation(reservation);

            return reservation;
        } catch (error) {
            throw new AppError({
                errorMessage: `createReservation Error, error: ${error instanceof Error ? error.message : String(error)}`,
                statusCode: APP_RESPONSE_CODE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    private calculateTotalNumberOfNights({ startDate, endDate }: { startDate: Date, endDate: Date }) {
        const MS_IN_DAY = 1000 * 60 * 60 * 24;

        const start = new Date(startDate);
        const end = new Date(endDate)

        const days = (end.getTime() - start.getTime()) / MS_IN_DAY;
        console.log('days: ', days)

        return days;
    }

    private calculateTotalPrice(
        { totalNumberOfNights, originalPricePerNight, discountPercent }: { totalNumberOfNights: number, originalPricePerNight: number, discountPercent: number }
    ) {
        const totalPricePerNight = originalPricePerNight * (1 - 1 / discountPercent);
        return totalNumberOfNights * totalPricePerNight;
    }
}