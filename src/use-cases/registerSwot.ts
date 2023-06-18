import { BusinessRepository } from "../repositories/business-repository";
import { SwotRepository } from "../repositories/swot-repository";
import { BusinessNotFoundError } from "./errors/business-not-found-error";

interface RegisterSwotRequest {
    strengths:     string[];
    weaknesses:    string[];
    opportunities: string[];
    threats:       string[];
    businessId: string; 
}

export class RegisterSwotUseCase {

    constructor(private swotRepository: SwotRepository, private businessRepository: BusinessRepository) {}

    async execute({businessId, opportunities, strengths, threats, weaknesses}:RegisterSwotRequest) {
        const businessExists = await this.businessRepository.findById(businessId);

        if(!businessExists) throw new BusinessNotFoundError();

        const swot  = await this.swotRepository.create({
            opportunities, strengths, threats, weaknesses,
            business: {
                connect: {
                    id: businessExists.id,
                }
            }
        })
        return {
            swot,
        };
    }
}