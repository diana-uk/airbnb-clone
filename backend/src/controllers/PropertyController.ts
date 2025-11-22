import { Request, Response } from "express";
import { sendResponse } from "../utils/send-response.utils";
import { AppError } from "../utils/AppError";
import { IPropertyDto } from "../models/properties.models";
import { PropertyService } from "../services/PropertyService";
import {
  APP_RESPONSE_CODE,
  FAILED_TO_CREATE_PROPERTY,
} from "../config/constants";

export class PropertyController {
  private propertyService: PropertyService;

  constructor() {
    this.propertyService = new PropertyService();
  }

  public createProperty = async (req: Request, res: Response) => {
    try {
      // TODO CP (Create Property) 1: Add middleware check of role
      const property: IPropertyDto = req.body;
      console.log(property);
      const createdProperty = await this.propertyService.createProperty(
        property
      );
      if (createdProperty == null) {
        return sendResponse({
          res: res,
          status: APP_RESPONSE_CODE.INTERNAL_SERVER_ERROR,
          message: FAILED_TO_CREATE_PROPERTY,
          data: createdProperty,
          success: false,
        });
      }
      return sendResponse({
        res: res,
        status: 200,
        data: createdProperty,
        success: true,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return sendResponse({
          res: res,
          status: error.statusCode,
          message: error?.message,
          success: false,
        });
      }
      return sendResponse({
        res: res,
        status: APP_RESPONSE_CODE.INTERNAL_SERVER_ERROR,
        success: false,
      });
    }
  };
}
