import { ActionPlanRepository } from "../repositories/action-plan-repository";
import { ActionPlanNotFoundError } from "./errors/action-plan-not-found-error";

export class GetActionPlanUseCase {
  constructor(private actionPlanRepository: ActionPlanRepository) {}

  async execute(id: string) {
    const actionPlan = await this.actionPlanRepository.findById(id);
    if (!actionPlan) throw new ActionPlanNotFoundError();
    return {
      actionPlan,
    };
  }
}
