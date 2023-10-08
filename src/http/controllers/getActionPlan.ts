import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaActionPlanRepository } from "../../prisma/prisma-action-plan-repository";
import { GetActionPlanUseCase } from "../../use-cases/getActionPlan";
import { ActionPlanNotFoundError } from "../../use-cases/errors/action-plan-not-found-error";
import { getBusiness } from "./getBusiness";
import { PrismaBusinessRepository } from "../../prisma/prisma-business-repository";
import { GetBusinessUseCase } from "../../use-cases/getBusiness";

export const getActionPlan = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const getActionBodySchema = z.object({
    id: z.string(),
  });

  const { id } = getActionBodySchema.parse(request.query);

  try {
    const actionPlanRepository = new PrismaActionPlanRepository();
    const getActionPlanUseCase = new GetActionPlanUseCase(actionPlanRepository);

    const businessRepository = new PrismaBusinessRepository();
    const getBusinessUseCase = new GetBusinessUseCase(businessRepository);

    const { business } = await getBusinessUseCase.execute(id);

    const { actionPlan } = await getActionPlanUseCase.execute(
      business.actionPlan?.id || ""
    );

    return {
      actionPlan,
    };
  } catch (err) {
    if (err instanceof ActionPlanNotFoundError) {
      return reply.code(404).send({ message: err.message });
    }
    throw err;
  }
};
