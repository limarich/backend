import { Prisma, ActionPlan } from "@prisma/client";
import { ActionPlanRepository } from "../repositories/action-plan-repository";
import { prisma } from "../lib/prisma";

export class PrismaActionPlanRepository implements ActionPlanRepository {
  async create(data: Prisma.ActionPlanCreateInput) {
    const actionPlan = await prisma.actionPlan.create({
      data: {
        ...data,
      },
    });
    return actionPlan;
  }
  async findById(actionPlanId: string) {
    const actionPlan = await prisma.actionPlan.findUnique({
      where: {
        id: actionPlanId,
      },
    });
    return actionPlan;
  }
  async findByBusinessId(businessId: string) {
    const actionPlan = await prisma.actionPlan.findUnique({
      where: {
        businessId,
      },
    });
    return actionPlan;
  }
  // async update(id: string, data: Prisma.ActionPlanUpdateInput){
  //     throw new Error("Method not implemented.");
  // }
}
