import { App } from "../App";
import { IPropertyDto, Property } from "../models/properties.models";
import { v4 as uuidv4 } from "uuid";

export class PropertyRepository {
  private dbConnectionInstance;

  constructor() {
    this.dbConnectionInstance = App.getDBInstance();
  }

  public createProperty = async (propertyData: IPropertyDto) => {
    try {
      const propertyId = uuidv4();
      const dbConnection = await this.dbConnectionInstance;
      const response = await dbConnection.execute(
        `INSERT INTO PROPERTIES (Id, Title, Description, Address, PricePerNight, ImageUrl, Bedrooms, Bathrooms, MaxGuests) VALUES (?,?,?,?,?,?,?,?,?)`,
        [
          propertyId,
          propertyData.title,
          propertyData.description,
          propertyData.address,
          propertyData.pricePerNight,
          propertyData.imageUrl,
          propertyData.bedrooms,
          propertyData.bathrooms,
          propertyData.maxGuests,
        ]
      );

      console.log(`createProperty ${response}`);

      const [rows] = (await dbConnection.execute(
        "SELECT * FROM PROPERTIES WHERE Id = ?",
        [propertyId]
      )) as any[];

      if (rows.length === 0) {
        return null;
      }

      const properties = rows as Property[];

      return properties[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}
