import { Prisma, BusinessModel } from "@prisma/client";
import { BusinessModelRepository } from "../business-model-repository";

export class InMemoryBusinessModelRepository
  implements BusinessModelRepository
{
  public businessModel: BusinessModel[] = [];
  async create(data: Prisma.BusinessModelCreateInput) {
    const {
      business,
      channels,
      costs,
      customerRelationship,
      customerSegments,
      id,
      mainActivities,
      mainPartnerships,
      mainResources,
      revenue,
      valueProposition,
    } = data;
    this.businessModel.push({
      businessId: business?.connect?.id ?? "generated-id",
      channels: Array.isArray(channels) ? channels : [],
      costs: Array.isArray(costs) ? costs : [],
      customerRelationship: Array.isArray(customerRelationship)
        ? customerRelationship
        : [],
      customerSegments: Array.isArray(customerSegments) ? customerSegments : [],
      id: "businessModel-Id",
      mainActivities: Array.isArray(mainActivities) ? mainActivities : [],
      mainPartnerships: Array.isArray(mainPartnerships) ? mainPartnerships : [],
      mainResources: Array.isArray(mainResources) ? mainResources : [],
      revenue: Array.isArray(revenue) ? revenue : [],
      valueProposition: Array.isArray(valueProposition) ? valueProposition : [],
    });

    return this.businessModel[0];
  }
  async findByBusinessId(businessId: string) {
    return (
      this.businessModel.find(
        (businessModel) => businessModel.businessId === businessId
      ) || null
    );
  }
  async findById(id: string) {
    return (
      this.businessModel.find((businessModel) => businessModel.id === id) ||
      null
    );
  }
}
