import { Request, Response } from "express";
import { sendResponse } from "../utils/send-response.utils";
import { AppError } from "../utils/AppError";
import { ICreatePropertyDto, IUpdatePropertyDto } from "../models/properties.models";
import { PropertyService } from "../services/PropertyService";
import {
  APP_RESPONSE_CODE,
  FAILED_TO_CREATE_PROPERTY,
  FAILED_TO_UPDATE_PROPERTY,
} from "../config/constants";
import { JwtUser } from "../types/auth.types";
import { CustomRequest } from "../types/request.types";

export class PropertyController {
  private propertyService: PropertyService;

  constructor() {
    this.propertyService = new PropertyService();
  }

  createProperty = async (req: Request, res: Response) => {
    try {
      const property: ICreatePropertyDto = req.body;
      const jwtUser = (req as CustomRequest).jwtUser;
      const hostUserId = (jwtUser as JwtUser).Id;

      console.log(property);
      const createdProperty = await this.propertyService.createProperty(
        property, hostUserId
      );
      if (createdProperty == null) {
        return sendResponse({
          res: res,
          status: APP_RESPONSE_CODE.INTERNAL_SERVER_ERROR,
          message: FAILED_TO_CREATE_PROPERTY,
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

  updateProperty = async (req: Request, res: Response) => {
    try {
      const propertyId = req.params.id
      const updateProperty: IUpdatePropertyDto = req.body;
      console.log(updateProperty);
      const updatedProperty = await this.propertyService.updateProperty(
        propertyId, updateProperty
      );
      if (updatedProperty == null) {
        return sendResponse({
          res: res,
          status: APP_RESPONSE_CODE.INTERNAL_SERVER_ERROR,
          message: FAILED_TO_UPDATE_PROPERTY,
          data: updatedProperty,
          success: false,
        });
      }
      return sendResponse({
        res: res,
        status: 200,
        data: updatedProperty,
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
  }
}
