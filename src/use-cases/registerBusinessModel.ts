import { BusinessModelRepository } from "../repositories/business-model-repository";
import { BusinessRepository } from "../repositories/business-repository";
import { BusinessModelAlreadyExistsError } from "./errors/business-model-already-exists";
import { BusinessNotFoundError } from "./errors/business-not-found-error";

interface RegisterBusinessModelRequest {
  mainPartnerships: string[];
  mainActivities: string[];
  mainResources: string[];
  valueProposition: string[];
  customerRelationship: string[];
  channels: string[];
  customerSegments: string[];
  costs: string[];
  revenue: string[];
  businessId: string;
}

export class RegisterBusinessModelUseCase {
  constructor(
    private businessRepository: BusinessRepository,
    private businessModelRepository: BusinessModelRepository
  ) {}

  public async execute({
    businessId,
    channels,
    costs,
    customerRelationship,
    customerSegments,
    mainActivities,
    mainPartnerships,
    mainResources,
    revenue,
    valueProposition,
  }: RegisterBusinessModelRequest) {
    const businessExists = await this.businessRepository.findById(businessId);

    const businessModelExists =
      await this.businessModelRepository.findByBusinessId(businessId);

    if (!businessExists) {
      throw new BusinessNotFoundError();
    }
    if (businessModelExists) {
      throw new BusinessModelAlreadyExistsError();
    }

    const businessModel = await this.businessModelRepository.create({
      business: {
        connect: {
          id: businessId,
        },
      },
      channels,
      costs,
      customerRelationship,
      customerSegments,
      mainActivities,
      mainPartnerships,
      mainResources,
      revenue,
      valueProposition,
    });
    return {
      businessModel,
    };
  }
}
