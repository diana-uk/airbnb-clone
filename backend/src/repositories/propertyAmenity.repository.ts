import { App } from "../App";
import { APP_RESPONSE_CODE } from "../config/constants";
import { AmenityProperty } from "../models/amenitiesProperties.model";
import { AppError } from "../utils/AppError";

export class propertyAmenityRepository {
  private dbConnectionInstance;
  constructor() {
    this.dbConnectionInstance = App.getDBInstance();
  }

  public createPropertyAmenity = async (
    propertyId: string,
    amenityId: string
  ) => {
    try {
      const connection = await this.dbConnectionInstance;

      const response = (await connection.execute(
        "INSERT INTO amenities_properties (PropertyId, AmenityId) VALUES  (?,?)",
        [propertyId, amenityId]
      )) as any[];

      console.log("createPropertyAmenity response: ", response);

      const [rows] = (await connection.execute(
        "SELECT * FROM amenities_properties WHERE PropertyId = ? AND AmenityId = ?",
        [propertyId, amenityId]
      )) as any[];

      const amenityProperty = rows as AmenityProperty[];

      return amenityProperty[0] || null;
    } catch (error) {
      throw new AppError({
        errorMessage: "createPropertyAmenity DB Error",
        statusCode: APP_RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      });
    }
  };

  public deleteAmenityByPropertyId = async (
    propertyId: string
  ) => {
    try {
      const connection = await this.dbConnectionInstance;

      const response = (await connection.execute(
        "DELETE FROM amenities_properties WHERE PropertyId = ?",
        [propertyId]
      )) as any;

      return response[0] || null;
    } catch (error) {
      throw new AppError({
        errorMessage: "createPropertyAmenity DB Error",
        statusCode: APP_RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      });
    }
  }
}

