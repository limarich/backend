import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaActionPlanRepository } from "../../prisma/prisma-action-plan-repository";
import { RegisterActionPlanUseCase } from "../../use-cases/registerActionPlan";
import { PrismaBusinessRepository } from "../../prisma/prisma-business-repository";
import { BusinessNotFoundError } from "../../use-cases/errors/business-not-found-error";
import { ActionPlanAlreadyExistsError } from "../../use-cases/errors/action-plan-alredy-exists-error";
import { UpdateActionPlanUseCase } from "../../use-cases/updateActionPlan";
import { Prisma } from "@prisma/client";

export async function UpdateActionPlan(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerActionPlanBodySchema = z.object({
    businessId: z.string(),
    items: z.array(
      z.object({
        // id: z.number(),
        what: z.string(),
        why: z.string(),
        who: z.string(),
        when: z.string(),
        where: z.string(),
        how: z.string(),
        howMuch: z.string(),
        actionPlanId: z.string(),
      })
    ),
  });

  const { businessId, items } = registerActionPlanBodySchema.parse(
    request.body
  );

  try {
    const prismaActionPlanRepository = new PrismaActionPlanRepository();
    const prismaBusinessRepository = new PrismaBusinessRepository();
    const updateActionPlanUseCase = new UpdateActionPlanUseCase(
      prismaActionPlanRepository,
      prismaBusinessRepository
    );

    await updateActionPlanUseCase.execute({
      businessId,
      data: items,
    });
  } catch (err) {
    if (err instanceof BusinessNotFoundError) {
      return reply.code(404).send({ message: err.message });
    }
    if (err instanceof ActionPlanAlreadyExistsError) {
      return reply.code(409).send({ message: err.message });
    }

    throw err;
  }
}
