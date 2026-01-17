import { App } from "../App";
import {
  ICreatePropertyDto,
  IProperty,
  IUpdateProperty,
} from "../models/properties.models";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "../utils/AppError";
import { APP_RESPONSE_CODE } from "../config/constants";

export class PropertyRepository {
  private dbConnectionInstance;

  constructor() {
    this.dbConnectionInstance = App.getDBInstance();
  }

  public createProperty = async (propertyData: ICreatePropertyDto, hostUserId: string) => {
    try {
      const propertyId = uuidv4();
      const dbConnection = await this.dbConnectionInstance;
      const response = await dbConnection.execute(
        `INSERT INTO PROPERTIES (Id, Title, Description, Address, PricePerNight, ImageUrl, Bedrooms, Bathrooms, MaxGuests, HostUserId) VALUES (?,?,?,?,?,?,?,?,?,?)`,
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
          hostUserId
        ]
      );

      const createdProperty = await this.findPropertyById(propertyId);

      return createdProperty;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  public findPropertyById = async (propertyId: string) => {
    try {
      const dbConnection = await this.dbConnectionInstance;

      const [rows] = await dbConnection.execute(
        "SELECT * FROM PROPERTIES WHERE Id = ?",
        [propertyId]
      ) as any[];
      console.log('rows: ', rows)

      if (rows.length === 0) {
        return null;
      }

      return rows[0] as IProperty;
    } catch (error) {
      throw new AppError({
        errorMessage: "getPropertyById DB Error",
        statusCode: APP_RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      });
    }
  };

  public deleteProperty = async (propertyId: string) => {
    try {
      const connection = await this.dbConnectionInstance;
      const [result] = await connection.execute(
        "DELETE FROM Properties WHERE Id = ?",
        [propertyId]
      );
      return result;
    } catch (error) {
      throw new AppError({
        errorMessage: "deleteProperty DB Error",
        statusCode: APP_RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      });
    }
  };

  public updateProperty = async (
    propertyId: string,
    updateProperty: IUpdateProperty
  ) => {
    try {
      const connection = await this.dbConnectionInstance;
      const sql = `UPDATE PROPERTIES
      SET Title=?, Description=?, Address=?, PricePerNight=?, ImageUrl=?, Bedrooms=?, Bathrooms=?, MaxGuests=?
      WHERE Id=?`;

      const params = [
        updateProperty.title ?? null,
        updateProperty.description ?? null,
        updateProperty.address ?? null,
        updateProperty.pricePerNight ?? null,
        updateProperty.imageUrl ?? null,
        updateProperty.bedrooms ?? null,
        updateProperty.bathrooms ?? null,
        updateProperty.maxGuests ?? null,
        propertyId,
      ];


      const [result] = await connection.execute(sql, params) as any;
      return result.affectedRows > 0;
    } catch (error) {
      throw new AppError({
        errorMessage: `updateProperty DB Error, Error: ${error}`,
        statusCode: APP_RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      });
    }
  };
}
