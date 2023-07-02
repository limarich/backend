import { BusinessRepository } from "../repositories/business-repository";
import { BusinessNotFoundError } from "./errors/business-not-found-error";

export class GetBusinessUseCase {
    constructor(private businessRepository: BusinessRepository) {}

    async execute(id: string){
        const business = await this.businessRepository.findById(id);
        if(!business) throw new BusinessNotFoundError();
        return {
            business
        }
    }
}