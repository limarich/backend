import { ActionPlan, Prisma } from "@prisma/client";
import { ActionPlanItems } from "../use-cases/updateActionPlan";

export interface ActionPlanRepository {
  create(data: Prisma.ActionPlanCreateInput): Promise<ActionPlan>;
  findById(actionPlanId: string): Promise<ActionPlan | null>;
  findByBusinessId(actionPlanId: string): Promise<ActionPlan | null>;
  update(id: string, data: ActionPlanItems[]): Promise<ActionPlan | null>;
}
