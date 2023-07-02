import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaBusinessRepository } from "../../prisma/prisma-business-repository";
import { GetBusinessUseCase } from "../../use-cases/getBusiness";
import { BusinessNotFoundError } from "../../use-cases/errors/business-not-found-error";

export const getBusiness = async (request: FastifyRequest, reply: FastifyReply) => {

    const getBusinessBodySchema = z.object({
        id: z.string(),
    })

    const { id } = getBusinessBodySchema.parse(request.query);

    try {
        const businessRepository = new PrismaBusinessRepository();
        const getBusinessUseCase = new GetBusinessUseCase(businessRepository); 

        const {business} =  await getBusinessUseCase.execute(id);

        return {
            business
        }

    } catch (err) {
        if(err instanceof BusinessNotFoundError) {
            return reply.code(404).send({message: err.message});
        }
        throw err;
    }

}