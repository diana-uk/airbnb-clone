import { Request, Response } from "express";
import { sendResponse } from "../utils/send-response.utils";
import { AppError } from "../utils/AppError";
import { IPropertyDto } from "../models/properties.models";
import { PropertyService } from "../services/PropertyService";

export class PropertyController {
  private propertyService: PropertyService;

  constructor() {
    this.propertyService = new PropertyService();
  }

  private createProperty = (req: Request, res: Response) => {
    try {
      // TODO CP (Create Property) 1: Add middleware check of role
      const property: IPropertyDto = req.body;
      const createdProperty = this.propertyService.createProperty(property);
    } catch (error) {
      if (error instanceof AppError) {
        return sendResponse(res, error.statusCode, error.message, false);
      }
      return sendResponse(res, 500, "Internal Server Error", false);
    }
  };
}
