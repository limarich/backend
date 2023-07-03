import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaBusinessModelRepository } from "../../prisma/prisma-business-model-repository";
import { BusinessModelNotFoundError } from "../../use-cases/errors/business-model-not-found-error";
import { GetBusinessModelUseCase } from "../../use-cases/getBusinessModel";

export const getBusinessModel = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const getBusinessModelBodySchema = z.object({
    id: z.string(),
  });

  const { id } = getBusinessModelBodySchema.parse(request.query);

  try {
    const businessModelRepository = new PrismaBusinessModelRepository();
    const getBusinessModelUseCase = new GetBusinessModelUseCase(
      businessModelRepository
    );

    const { businessModel } = await getBusinessModelUseCase.execute(id);

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
