import { IProperty, ICreatePropertyDto, IPropertyDto } from "../models/properties.models";

export class PropertyMapper {
    static toResponseDto(property: IProperty, amenities?: string[]): IPropertyDto {
        return {
            id: property.Id,
            title: property.Title,
            description: property.Description,
            address: property.Address,
            pricePerNight: property.PricePerNight,
            imageUrl: property.ImageUrl,
            bedrooms: property.Bedrooms,
            bathrooms: property.Bathrooms,
            maxGuests: property.MaxGuests,
            amenities: amenities,
            hostUserId: property.HostUserId
        };
    }
}