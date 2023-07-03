import { Prisma, Swot } from "@prisma/client";
import { SwotRepository } from "../swot-repository";
import { SwotNotFoundError } from "../../use-cases/errors/swot-not-found-error";

export class InMemorySwotRepository implements SwotRepository {
  public swot: Swot[] = [];

  async create(data: Prisma.SwotCreateInput) {
    const { business, id, opportunities, strengths, threats, weaknesses } =
      data;

    const swot: Swot = {
      opportunities: Array.isArray(opportunities) ? opportunities : [],
      strengths: Array.isArray(strengths) ? strengths : [],
      threats: Array.isArray(threats) ? threats : [],
      weaknesses: Array.isArray(weaknesses) ? weaknesses : [],
      id: "swot-1",
      businessId: data.business.connect?.id ?? "business-id",
    };

    this.swot.push(swot);

    return swot;
  }

  async findById(id: string) {
    return this.swot.find((s) => s.id === id) || null;
  }
  async update(id: string, data: Prisma.SwotUpdateInput) {
    const index = this.swot.findIndex((s) => s.id === id);

    if (index === -1) {
      throw new SwotNotFoundError();
    }

    const { opportunities, strengths, threats, weaknesses } = data;

    this.swot[index] = {
      ...this.swot[index],
      opportunities: opportunities as string[],
      strengths: strengths as string[],
      threats: threats as string[],
      weaknesses: weaknesses as string[],
    };

    return this.swot[index];
  }
}
