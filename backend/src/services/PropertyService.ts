import { PropertyRepository } from "../repositories/propertyRespository.respository";
import { IPropertyDto } from "../models/properties.models";

export class PropertyService {
  private propertyRepository: PropertyRepository;

  constructor() {
    this.propertyRepository = new PropertyRepository();
  }

  public async createProperty(property: IPropertyDto) {
    const createdProperty = await this.propertyRepository.createProperty(
      property
    );
    return createdProperty;
  }
}
