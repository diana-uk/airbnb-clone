// TODO CP 2: Change amenities to be Amenity[] or something else
export interface ICreatePropertyDto {
  title: string;
  description: string;
  address: string;
  pricePerNight: number;
  imageUrl: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  amenities: string[];
}

export interface IProperty {
  Id: string;
  Title: string;
  Description: string;
  Address: string;
  PricePerNight: number;
  ImageUrl: string;
  Bedrooms: number;
  Bathrooms: number;
  MaxGuests: number;
  HostUserId: string;
}

export interface IPropertyDto {
  id: string;
  title: string;
  description: string;
  address: string;
  pricePerNight: number;
  imageUrl: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  amenities?: string[];
  hostUserId: string;
}

export interface IUpdatePropertyDto {
  title?: string | null;
  description?: string | null;
  address?: string | null;
  pricePerNight?: number | null;
  imageUrl?: string | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  maxGuests?: number | null;
  amenityIds?: string[]
}

// TODO: Add amenity type
export interface IUpdateProperty {
  title?: string | null;
  description?: string | null;
  address?: string | null;
  pricePerNight?: number | null;
  imageUrl?: string | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  maxGuests?: number | null;
  amenities?: string[]
}

// export enum Amenity {
//     WIFI = "WiFi",
//     AIR_CONDITIONING
// }
