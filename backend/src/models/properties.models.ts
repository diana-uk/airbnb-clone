// TODO CP 2: Change amenities to be Amenity[] or something else
export interface IPropertyDto {
  title: string;
  description: string;
  address: string;
  pricePerNight: number;
  imageUrl: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  amenities: string[];
  hostUserId: number;
}

// export enum Amenity {
//     WIFI = "WiFi",
//     AIR_CONDITIONING
// }
