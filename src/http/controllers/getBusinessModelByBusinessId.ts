import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaBusinessModelRepository } from "../../prisma/prisma-business-model-repository";
import { GetBusinessModelByBusinessIdUseCase } from "../../use-cases/getBusinessModelByBusinessId";
import { BusinessModelNotFoundError } from "../../use-cases/errors/business-model-not-found-error";

export const getBusinessModelByBusinessId = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const getBusinessModelByBusinessIdBodySchema = z.object({
    id: z.string(),
  });

  const { id } = getBusinessModelByBusinessIdBodySchema.parse(request.query);

  try {
    const businessModelRepository = new PrismaBusinessModelRepository();
    const getBusinessModelByBusinessIdUseCase =
      new GetBusinessModelByBusinessIdUseCase(businessModelRepository);

    const { businessModel } = await getBusinessModelByBusinessIdUseCase.execute(
      id
    );

    return {
      businessModel,
    };
  } catch (err) {
    if (err instanceof BusinessModelNotFoundError) {
      return reply.code(404).send({ message: err.message });
    }
    throw err;
  }
};
