import {  Business } from "@prisma/client";
import { BusinessRepository } from "../repositories/business-repository";
import { BusinessNotFoundError } from "./errors/business-not-found-error";

interface UpdateBusinessUseCaseRequest {
  id: string;
  name?: string;
  phone?: string;
  website?: string;
  userId?: string;
  addressId?: string;
}

export class UpdateBusinessUseCase {
  constructor(private businessRepository: BusinessRepository) {}

  async execute({
    id,
    addressId,
    name,
    phone,
    userId,
    website,
  }: UpdateBusinessUseCaseRequest) {
    const business = await this.businessRepository.findById(id);

    if (!business) throw new BusinessNotFoundError();

    const updatedBusinessData: Partial<Business> = {};

    if (name) {
      updatedBusinessData.name = name;
    }

    if(addressId) {
        updatedBusinessData.addressId = addressId;
    }
    if(phone) {
        updatedBusinessData.phone = phone;
    }
    if(userId) {
        updatedBusinessData.userId = userId;
    }
    if(website) {
        updatedBusinessData.website = website;
    }

    const updatedBusiness = await this.businessRepository.update(
      id,
      updatedBusinessData
    );

    return {
      business: updatedBusiness,
    };
  }
}