import { Prisma, Business, User } from "@prisma/client";
import { BusinessRepository } from "../business-repository";
import { InMemoryUsersRepository } from "./in-memory-users-repository";
import { RegisterUseCase } from "../../use-cases/register";

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


export class InMemoryBusinessRepository implements BusinessRepository {
    public businesses: Business[] = [];

    async findById(id: string) {
      const business = this.businesses.find(business => business.id === id) || null;

      return business;
    }
    
    async create(data: Prisma.BusinessCreateInput): Promise<Business> {
        

        const { name, phone, address, website, user, id } = data;
      
        const businessData: CreateInput = {
          name,
          phone,
          user: {
            connect: {
              id: (user as any)?.connect?.id,
            },
          },
        };
      
        if (website) {
          businessData.website = website;
        }
      
        if (address) {
          businessData.address = {
            connect: {
              id: (address as any)?.connect?.id,
            },
          };
        }
      
        const newBusiness: Business = {
          id: id ?? "generated-id", 
          userId: businessData.user.connect.id,
          addressId: businessData.address?.connect?.id ?? null,
          name: businessData.name,
          phone: businessData.phone,
          website: businessData.website ?? null,
        };
      
        this.businesses.push(newBusiness);
      
        return Promise.resolve(newBusiness);
      }
      

}