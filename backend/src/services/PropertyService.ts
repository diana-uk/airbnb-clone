import { PropertyRepository } from "../repositories/propertyRespository.respository";
import { IPropertyDto } from "../models/properties.models";

export class PropertyService {
  private propertyRepository: PropertyRepository;

  constructor() {
    this.propertyRepository = new PropertyRepository();
  }

  public createProperty(property: IPropertyDto) {}
}
