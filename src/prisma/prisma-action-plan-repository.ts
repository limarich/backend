import { Prisma, ActionPlan, ActionItem } from "@prisma/client";
import { ActionPlanRepository } from "../repositories/action-plan-repository";
import { prisma } from "../lib/prisma";
import { ActionPlanItems } from "../use-cases/updateActionPlan";

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
      include: {
        items: true,
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
  async deleteAllActionItems(actionPlanId: string) {
    await prisma.actionItem.deleteMany({
      where: {
        actionPlanId: actionPlanId,
      },
    });
  }
  async createMultipleActionItems(items: ActionPlanItems[]) {
    const actionItems = items.map((item) => ({
      what: item.what,
      why: item.why,
      who: item.who,
      when: item.when,
      where: item.where,
      how: item.how,
      howMuch: item.howMuch,
      actionPlanId: item.actionPlanId,
    }));

    const createdItems = await prisma.actionItem.createMany({
      data: actionItems,
    });

    return createdItems;
  }
  async update(id: string, items: ActionPlanItems[]) {
    // Iniciar uma transação
    const transaction = await prisma.$transaction(async (prisma) => {
      // Remover os itens antigos
      await prisma.actionItem.deleteMany({
        where: {
          actionPlanId: id,
        },
      });

      // Criar os novos itens
      await prisma.actionItem.createMany({
        data: items.map((item) => ({
          ...item,
          actionPlanId: id,
        })),
      });
    });

    // Buscar e retornar o ActionPlan após a atualização
    const updatedActionPlan = await prisma.actionPlan.findUnique({
      where: {
        id: id,
      },
    });

    return updatedActionPlan;
  }
}
