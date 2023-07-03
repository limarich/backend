import { Swot } from "@prisma/client";
import { SwotRepository } from "../repositories/swot-repository";
import { SwotNotFoundError } from "./errors/swot-not-found-error";

interface UpdateSwotUseCaseRequest {
  id: string;
  strengths?:     string[];
  weaknesses?:    string[];
  opportunities?: string[];
  threats?:      string[];
}

export class UpdateSwotUseCase {
  constructor(private swotRepository: SwotRepository) {}

  async execute({
    id,
    opportunities,
    strengths,
    threats,
    weaknesses
  }: UpdateSwotUseCaseRequest) {
    const swot = await this.swotRepository.findById(id);

    if (!swot) {
        throw new SwotNotFoundError();
    }

    const updatedSwotData: Partial<Swot> = {};

    if (opportunities) {
      updatedSwotData.opportunities = opportunities;
    }

    if(strengths) {
        updatedSwotData.strengths = strengths;
    }
    if(threats) {
        updatedSwotData.threats = threats;
    }
    if(weaknesses) {
        updatedSwotData.weaknesses = weaknesses;
    }

    const updatedSwot = await this.swotRepository.update(
      id,
      updatedSwotData
    );

    return {
      swot: updatedSwot,
    };
  }
}