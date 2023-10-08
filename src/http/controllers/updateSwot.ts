import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaSwotRepository } from "../../prisma/prisma-swot-repository";
import { UpdateSwotUseCase } from "../../use-cases/updateSwot";
import { SwotNotFoundError } from "../../use-cases/errors/swot-not-found-error";
import { PrismaBusinessRepository } from "../../prisma/prisma-business-repository";
import { GetBusinessUseCase } from "../../use-cases/getBusiness";

export async function updateSwot(request: FastifyRequest, reply: FastifyReply) {
  const updateSwotBodySchema = z.object({
    businessId: z.string(),
    strengths: z.array(z.string()).optional(),
    weaknesses: z.array(z.string()).optional(),
    opportunities: z.array(z.string()).optional(),
    threats: z.array(z.string()).optional(),
  });

  const { businessId, opportunities, strengths, threats, weaknesses } =
    updateSwotBodySchema.parse(request.body);

  try {
    const prismaSwotRepository = new PrismaSwotRepository();
    const prismaBusinessRepository = new PrismaBusinessRepository();
    const updateSwotUseCase = new UpdateSwotUseCase(prismaSwotRepository);
    const getBusinessUseCase = new GetBusinessUseCase(prismaBusinessRepository);

    const { business } = await getBusinessUseCase.execute(businessId);

    const { swot } = await updateSwotUseCase.execute({
      id: business.swot?.id || "",
      opportunities,
      strengths,
      threats,
      weaknesses,
    });

    return {
      swot,
    };
  } catch (err) {
    if (err instanceof SwotNotFoundError) {
      return reply.code(404).send({ message: err.message });
    }

    throw err;
  }
}
