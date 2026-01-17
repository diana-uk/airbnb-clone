export interface CreateReservationRequestDto {
    startDate: Date;
    endDate: Date;
    propertyTitle: string;
    numberOfGuests: number;
    discountPercent: number;
    specialRequests: string;
}

// TODO [BNB-10] Change the startDate and EndDate in ReservationResponseDto to another type (e.g. Date) after research
// TODO [BNB-11] Change the status in ReservationResponseDto to another type (e.g. enum)
export interface ReservationResponseDto {
    reservationId: string;
    propertyId: number;
    propertyTitle: string;
    startDate: string;
    endDate: string;
    numberOfGuests: number;
    totalPrice: number;
    status: string
}

export interface Reservation {
    Id: string;
    PropertyId: string;
    PropertyTitle: string; // TODO Check how the string is interpeted in DB as VARCHAR
    StartDate: Date; // TODO Check if it can Date saved in SQL DB
    EndDate: Date;
    NumberOfGuests: number;
    TotalPrice: number;
    Status: string  // TODO Check if enum can besaved in SQL DB or can be only be string
    UserId: string
}