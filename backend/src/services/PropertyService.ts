import { PropertyRepository } from "../repositories/propertyRespository.respository";
import { ICreatePropertyDto, IUpdatePropertyDto } from "../models/properties.models";
import { AmenityRepository } from "../repositories/amenityRepository.repository";
import { AppError } from "../utils/AppError";
import { propertyAmenityRepository } from "../repositories/propertyAmenity.repository";
import { APP_RESPONSE_CODE } from "../config/constants";
import { App } from "../App";

export class PropertyService {
  private propertyRepository: PropertyRepository;
  private amenityRepository: AmenityRepository;
  private propertyAmenityRepository: propertyAmenityRepository;

  private dbConnectionInstance;

  constructor() {
    this.propertyRepository = new PropertyRepository();
    this.amenityRepository = new AmenityRepository();
    this.propertyAmenityRepository = new propertyAmenityRepository();

    this.dbConnectionInstance = App.getDBInstance();
  }

  public async createPropertiesAmenitiesRelation(amenityIds: string[], propertyId: string) {
    // Process amenities sequentially to ensure proper awaiting and error handling
    for (const amenityId of amenityIds) {
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
  // The amenities string[] is ids not the names from the FE
  public async createProperty(property: ICreatePropertyDto, hostUserId: string) {
    try {
      (await this.dbConnectionInstance).beginTransaction();
      // TODO 1: In one transaction -> add property to DB and row in amenities_properties with amenityId and propertyId created
      const createdProperty = await this.propertyRepository.createProperty(
        property, hostUserId
      );

      if (createdProperty == null) {
        throw new AppError({
          errorMessage: "Error occured while creating property",
          statusCode: APP_RESPONSE_CODE.INTERNAL_SERVER_ERROR,
        });
      }

      const amenitiesIds = property.amenities ?? [];
      await this.createPropertiesAmenitiesRelation(amenitiesIds, createdProperty.Id);

      (await this.dbConnectionInstance).commit();
      return createdProperty;
    } catch (error) {
      (await this.dbConnectionInstance).rollback();
      throw error;
    }
  }

  public async updateProperty(
    propertyId: string,
    updatePropertyDto: IUpdatePropertyDto
  ) {
    try {
      const property = await this.propertyRepository.findPropertyById(propertyId)
      if (!property) {
        throw new AppError({
          errorMessage: `Property ID ${propertyId} does not exist`,
          statusCode: APP_RESPONSE_CODE.INTERNAL_SERVER_ERROR,
        });
      }
      const amenityIds = updatePropertyDto.amenityIds ?? [];

      (await this.dbConnectionInstance).beginTransaction();

      // 1. Update property fields in property row from the table
      const updatePropertyResult = await this.propertyRepository.updateProperty(
        propertyId,
        updatePropertyDto
      );

      // 2. Insert property row to the property table
      if (updatePropertyResult == null) {
        (await this.dbConnectionInstance).rollback();
        throw new AppError({
          errorMessage: `Could not update propertyId=${propertyId}`,
          statusCode: APP_RESPONSE_CODE.INTERNAL_SERVER_ERROR,
        });
      }

      // 3. Delete all rows in amenities_properties which PropertyId column equals to the propertyId
      const deleteAmenityByPropertyIdResult =
        await this.propertyAmenityRepository.deleteAmenityByPropertyId(
          propertyId
        );
      if (deleteAmenityByPropertyIdResult == null) {
        (await this.dbConnectionInstance).rollback();

        throw new AppError({
          errorMessage: `Could not update propertyId=${propertyId}`,
          statusCode: APP_RESPONSE_CODE.INTERNAL_SERVER_ERROR,
        });
      }

      // 4. Insert rows to the amenities_properties table
      amenityIds.forEach((amenityId => {
        // Check amenity id exist in DB
        const amenity = this.amenityRepository.findAmenityById(amenityId);
        if (!amenity) {
          throw new AppError({
            errorMessage: `Could not update propertyId=${propertyId}`,
            statusCode: APP_RESPONSE_CODE.INTERNAL_SERVER_ERROR,
          });
        }

      }))

      await this.createPropertiesAmenitiesRelation(amenityIds, propertyId);
      return updatePropertyResult;

    } catch (error) {
      throw new AppError({
        errorMessage: `updateProperty Error, error: ${error instanceof Error ? error.message : String(error)}`,
        statusCode: APP_RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      });
    }
  }

}
