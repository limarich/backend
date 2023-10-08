import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UpdateBusinessModelUseCase } from "../../use-cases/updateBusinessModel";
import { PrismaBusinessModelRepository } from "../../prisma/prisma-business-model-repository";
import { BusinessModelNotFoundError } from "../../use-cases/errors/business-model-not-found-error";
import { GetBusinessUseCase } from "../../use-cases/getBusiness";
import { PrismaBusinessRepository } from "../../prisma/prisma-business-repository";

export async function updateBusinessModel(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateBusinessModelBodySchema = z.object({
    businessId: z.string(),
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
    businessId,
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
    const prismaBusinessRepository = new PrismaBusinessRepository();
    const getBusinessUseCase = new GetBusinessUseCase(prismaBusinessRepository);

    const { business } = await getBusinessUseCase.execute(businessId);

    const { businessModel } = await updateBusinessModelUseCase.execute({
      id: business.businessModel?.id || "",
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
