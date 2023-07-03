import { SwotRepository } from "../repositories/swot-repository";
import { SwotNotFoundError } from "./errors/swot-not-found-error";

export class GetSwotUseCase {
  constructor(private swotRepository: SwotRepository) {}

  async execute(id: string) {
    const swot = await this.swotRepository.findById(id);

    if (!swot) throw new SwotNotFoundError();
    return {
      swot,
    };
  }
}
