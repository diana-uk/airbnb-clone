import { App } from "../App";
import { APP_RESPONSE_CODE } from "../config/constants";
import { Amenity } from "../models/amenities.model";
import { AppError } from "../utils/AppError";

export class AmenityRepository {
  private dbConnectionInstance;
  constructor() {
    this.dbConnectionInstance = App.getDBInstance();
  }

  public findAmenityById = async (amenityId: string) => {
    try {
      const connection = await this.dbConnectionInstance;
      const [rows] = (await connection.execute(
        "SELECT * FROM amenities WHERE Id = ?",
        [amenityId]
      )) as any[];

      if (rows == null || rows.length === 0) {
        return null;
      }

      const amenity = rows[0] as Amenity;

      return amenity;
    } catch (error) {
      throw new AppError({
        errorMessage: "getAmenityById DB Error",
        statusCode: APP_RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      });
    }
  };
}
