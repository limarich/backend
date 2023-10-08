import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaSwotRepository } from "../../prisma/prisma-swot-repository";
import { GetSwotUseCase } from "../../use-cases/getSwot";
import { SwotNotFoundError } from "../../use-cases/errors/swot-not-found-error";
import { PrismaBusinessRepository } from "../../prisma/prisma-business-repository";
import { GetBusinessUseCase } from "../../use-cases/getBusiness";

export const getSwot = async (request: FastifyRequest, reply: FastifyReply) => {
  const getSwotBodySchema = z.object({
    id: z.string(),
  });

  const { id } = getSwotBodySchema.parse(request.query);

  try {
    const swotRepository = new PrismaSwotRepository();
    const businessRepository = new PrismaBusinessRepository();
    const getBusinessUseCase = new GetBusinessUseCase(businessRepository);
    const getBusinessSwotUseCase = new GetSwotUseCase(swotRepository);

    const { business } = await getBusinessUseCase.execute(id);
    console.log(business);
    const { swot } = await getBusinessSwotUseCase.execute(
      business.swot?.id || ""
    );

    return {
      swot,
    };
  } catch (err) {
    if (err instanceof SwotNotFoundError) {
      return reply.code(404).send({ message: err.message });
    }
    throw err;
  }
};
