import { Prisma, Swot } from "@prisma/client";
import { SwotRepository } from "../swot-repository";

export class InMemorySwotRepository implements SwotRepository {
  public swot: Swot[] = [];

  async create(data: Prisma.SwotCreateInput) {
    const { business, id, opportunities, strengths, threats, weaknesses } = data;

    const swot:Swot = {
      opportunities: Array.isArray(opportunities) ? opportunities : [],
      strengths: Array.isArray(strengths) ?  strengths : [],
      threats: Array.isArray(threats) ? threats : [],
      weaknesses: Array.isArray(weaknesses)  ? weaknesses : [],
      id: 'swot-1',
      businessId: data.business.connect?.id ?? 'business-id',
    };

    this.swot.push(swot);

    return swot;
  }

  async findById(id: string) {
    return this.swot.find(s => s.id === id) || null;
  }
}
