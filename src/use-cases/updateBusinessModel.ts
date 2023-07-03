import { BusinessModel } from "@prisma/client";
import { BusinessModelRepository } from "../repositories/business-model-repository";
import { BusinessModelNotFoundError } from "./errors/business-model-not-found-error";

interface UpdateBusinessModelUseCaseRequest {
  id: string;
  mainPartnerships?: string[];
  mainActivities?: string[];
  mainResources?: string[];
  valueProposition?: string[];
  customerRelationship?: string[];
  channels?: string[];
  customerSegments?: string[];
  costs?: string[];
  revenue?: string[];
}
export class UpdateBusinessModelUseCase {
  constructor(private businessModelRepository: BusinessModelRepository) {}

  async execute({
    id,
    channels,
    costs,
    revenue,
    customerSegments,
    customerRelationship,
    mainActivities,
    mainPartnerships,
    mainResources,
    valueProposition,
  }: UpdateBusinessModelUseCaseRequest) {
    const businessModel = await this.businessModelRepository.findById(id);

    if (!businessModel) throw new BusinessModelNotFoundError();

    const updatedBusinessData: Partial<BusinessModel> = {};

    if (channels) {
      updatedBusinessData.channels = channels;
    }
    if (costs) {
      updatedBusinessData.costs = costs;
    }
    if (revenue) {
      updatedBusinessData.revenue = revenue;
    }
    if (customerSegments) {
      updatedBusinessData.customerSegments = customerSegments;
    }
    if (customerRelationship) {
      updatedBusinessData.customerRelationship = customerRelationship;
    }
    if (mainActivities) {
      updatedBusinessData.mainActivities = mainActivities;
    }
    if (mainPartnerships) {
      updatedBusinessData.mainPartnerships = mainPartnerships;
    }
    if (mainResources) {
      updatedBusinessData.mainResources = mainResources;
    }
    if (valueProposition) {
      updatedBusinessData.valueProposition = valueProposition;
    }

    const updatedBusiness = await this.businessModelRepository.update(
      id,
      updatedBusinessData
    );

    return {
      businessModel: updatedBusiness,
    };
  }
}
