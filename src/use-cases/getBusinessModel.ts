import { BusinessModelRepository } from "../repositories/business-model-repository";
import { BusinessModelNotFoundError } from "./errors/business-model-not-found-error";

export class GetBusinessModelUseCase {
  constructor(private businessModelRepository: BusinessModelRepository) {}

  async execute(id: string) {
    const businessModel = await this.businessModelRepository.findById(id);
    if (!businessModel) throw new BusinessModelNotFoundError();
    return {
      businessModel,
    };
  }
}
