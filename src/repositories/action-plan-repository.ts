import { ActionPlan, Prisma } from "@prisma/client";

export interface ActionPlanRepository {
  create(data: Prisma.ActionPlanCreateInput): Promise<ActionPlan>;
  findById(actionPlanId: string): Promise<ActionPlan | null>;
  findByBusinessId(actionPlanId: string): Promise<ActionPlan | null>;
  // update(id: string, data: Prisma.ActionPlanUpdateInput): Promise<ActionPlan>;
}
