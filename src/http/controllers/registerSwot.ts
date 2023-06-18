import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaBusinessRepository } from "../../prisma/prisma-business-repository";
import { PrismaSwotRepository } from "../../prisma/prisma-swot-repository";
import { RegisterSwotUseCase } from "../../use-cases/registerSwot";
import { BusinessNotFoundError } from "../../use-cases/errors/business-not-found-error";

export async function RegisterSwot(request: FastifyRequest, reply: FastifyReply) {

    const registerBodySchema = z.object({
        strengths:  z.array(z.string()),
        weaknesses:  z.array(z.string()),
        opportunities:  z.array(z.string()),
        threats:  z.array(z.string()),
        businessId: z.string(), 
    })

    const { businessId, opportunities,strengths,threats,weaknesses } = registerBodySchema.parse(request.body);

    try {

        const prismaBusinessRepository = new PrismaBusinessRepository(); 
        const prismaSwotRepository = new PrismaSwotRepository(); 
        const registerSwotUseCase = new RegisterSwotUseCase( prismaSwotRepository, prismaBusinessRepository);

        await registerSwotUseCase.execute({  businessId, opportunities,strengths,threats,weaknesses });
    } catch (err) {

        if(err instanceof BusinessNotFoundError) {
            return reply.code(404).send({ message: err.message});
        }

        throw err;
    }

}