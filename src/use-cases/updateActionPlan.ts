import { Prisma } from "@prisma/client";
import { BusinessRepository } from "../repositories/business-repository";
import { BusinessNotFoundError } from "./errors/business-not-found-error";
import { ActionPlanRepository } from "../repositories/action-plan-repository";

export interface UpdateActionPlanUseCaseRequest {
  businessId: string;
  data: ActionPlanItems[];
}

export interface ActionPlanItems {
  where: string;
  // id: number;
  what: string;
  why: string;
  who: string;
  when: string;
  how: string;
  howMuch: string;
  actionPlanId: string;
}

export class UpdateActionPlanUseCase {
  constructor(
    private actionPlanRepository: ActionPlanRepository,
    private businessRepository: BusinessRepository
  ) {}

  async execute({ businessId, data }: UpdateActionPlanUseCaseRequest) {
    const business = await this.businessRepository.findById(businessId);

    if (!business) throw new BusinessNotFoundError();

    const actionPlanId = business.actionPlan?.id || "";

    const updatedActionPlan = await this.actionPlanRepository.update(
      actionPlanId,
      data
    );

    return {
      actionPlan: updatedActionPlan,
    };
  }
}
