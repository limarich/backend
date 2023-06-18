import { BusinessRepository } from "../repositories/business-repository";
import { UsersRepository } from "../repositories/users-repository";
import { UserNotFoundError } from "./errors/user-not-found-error";

interface RegisterBusinessRequest {
    name: string;
    phone: string;
    website?: string;
    userId: string;
    addressId?: string;
}
interface ConnectInput {
    id: string;
  }
  
  interface CreateInput {
    name: string;
    phone: string;
    website?: string;
    user: {
      connect: ConnectInput;
    };
    address?: {
      connect: ConnectInput;
    };
  }

export class RegisterBusinessUseCase {
    constructor(private businessRepository: BusinessRepository, private usersRepository: UsersRepository) {}

    async execute({
        name,
        phone,
        website,
        userId,
        addressId,

    }:RegisterBusinessRequest) {

        const userExists = await this.usersRepository.findById(userId);

        if(!userExists) throw new UserNotFoundError(); 
        
        const businessData:CreateInput = {
        name,
        phone,
        user: {
            connect: { 
              id: userId,
            },
          },
        };

        if (website) {
      businessData.website = website;
    }

    if (addressId) {
      businessData.address = {
        connect: {
          id: addressId,
        },
      };
    }

    const business = await this.businessRepository.create(businessData);

        return {
            business
        }
    }
}