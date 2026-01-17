import { AmenityRepository } from "../repositories/amenityRepository.repository";
import { AppError } from "../utils/AppError";
import { APP_RESPONSE_CODE } from "../config/constants";
import { propertyAmenityRepository } from "../repositories/propertyAmenity.repository";

export class AmenityService {
  private propertyAmenityRepository: propertyAmenityRepository;
  private amenityRepository: AmenityRepository;

  constructor() {
    this.propertyAmenityRepository = new propertyAmenityRepository();
    this.amenityRepository = new AmenityRepository();
  }

  public async createAmenities(amenitiesIds: string[], propertyId: string) {
    for (const amenityId of amenitiesIds) {
      const amenity = await this.amenityRepository.findAmenityById(amenityId);
      if (amenity == null) {
        throw new AppError({
          errorMessage: `Amenity with ID ${amenityId} does not exist`,
          statusCode: APP_RESPONSE_CODE.INTERNAL_SERVER_ERROR,
        });
      }
      const addedPropertyAmenity =
        await this.propertyAmenityRepository.createPropertyAmenity(
          propertyId,
          amenityId
        );
      if (addedPropertyAmenity == null) {
        throw new AppError({
          errorMessage: `Could not add amenityId=${amenityId} with propertId=${propertyId} to DB`,
          statusCode: APP_RESPONSE_CODE.INTERNAL_SERVER_ERROR,
        });
      }
    }
  }
}
