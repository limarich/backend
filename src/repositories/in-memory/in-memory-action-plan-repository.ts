import { Prisma, ActionPlan } from "@prisma/client";
import { ActionPlanRepository } from "../action-plan-repository";

export class InMemoryActionPlanRepository implements ActionPlanRepository {
  public actionPlans: ActionPlan[] = [];
  async create(data: Prisma.ActionPlanCreateInput) {
    const { business, id, items } = data;
    this.actionPlans.push({
      businessId: business?.connect?.id ?? "generated-id",
      id: id ?? "generated-action-plan-id",
    });

    return this.actionPlans[0];
  }
  async findByBusinessId(businessId: string) {
    return (
      this.actionPlans.find(
        (actionPlan) => actionPlan.businessId === businessId
      ) || null
    );
  }
  async findById(id: string) {
    return this.actionPlans.find((actionPlan) => actionPlan.id === id) || null;
  }
}
