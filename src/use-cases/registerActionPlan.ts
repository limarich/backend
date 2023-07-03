import { ActionItem } from "@prisma/client";
import { ActionPlanRepository } from "../repositories/action-plan-repository";
import { BusinessRepository } from "../repositories/business-repository";
import { BusinessNotFoundError } from "./errors/business-not-found-error";
import { ActionPlanAlreadyExistsError } from "./errors/action-plan-alredy-exists-error";

interface ActionPlanRequest {
  businessId: string;
  items: ActionItem[];
}

export class RegisterActionPlanUseCase {
  constructor(
    private actionPlanRepository: ActionPlanRepository,
    private businessRepository: BusinessRepository
  ) {}

  async execute({ businessId, items }: ActionPlanRequest) {
    const businessExists = await this.businessRepository.findById(businessId);
    const actionPlanExists = await this.actionPlanRepository.findByBusinessId(
      businessId
    );

    if (!businessExists) throw new BusinessNotFoundError();
    if (!!actionPlanExists) throw new ActionPlanAlreadyExistsError();

    const actionPlan = await this.actionPlanRepository.create({
      business: {
        connect: { id: businessId },
      },
      items: {
        create: items,
      },
    });

    return {
      actionPlan,
    };
  }
}
