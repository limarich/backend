import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UpdateBusinessModelUseCase } from "../../use-cases/updateBusinessModel";
import { PrismaBusinessModelRepository } from "../../prisma/prisma-business-model-repository";
import { BusinessModelNotFoundError } from "../../use-cases/errors/business-model-not-found-error";

export async function updateBusinessModel(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateBusinessModelBodySchema = z.object({
    id: z.string(),
    mainPartnerships: z.array(z.string()).optional(),
    mainActivities: z.array(z.string()).optional(),
    mainResources: z.array(z.string()).optional(),
    valueProposition: z.array(z.string()).optional(),
    customerRelationship: z.array(z.string()).optional(),
    channels: z.array(z.string()).optional(),
    customerSegments: z.array(z.string()).optional(),
    costs: z.array(z.string()).optional(),
    revenue: z.array(z.string()).optional(),
  });

  const {
    id,
    channels,
    costs,
    customerRelationship,
    customerSegments,
    mainActivities,
    mainPartnerships,
    mainResources,
    revenue,
    valueProposition,
  } = updateBusinessModelBodySchema.parse(request.body);

  try {
    const prismaBusinessModelRepository = new PrismaBusinessModelRepository();
    const updateBusinessModelUseCase = new UpdateBusinessModelUseCase(
      prismaBusinessModelRepository
    );

    const { businessModel } = await updateBusinessModelUseCase.execute({
      id,
      channels,
      costs,
      customerRelationship,
      customerSegments,
      mainActivities,
      mainPartnerships,
      mainResources,
      revenue,
      valueProposition,
    });

    return {
      businessModel,
    };
  } catch (err) {
    if (err instanceof BusinessModelNotFoundError) {
      return reply.code(404).send({ message: err.message });
    }

    throw err;
  }
}
