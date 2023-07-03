import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaSwotRepository } from "../../prisma/prisma-swot-repository";
import { UpdateSwotUseCase } from "../../use-cases/updateSwot";
import { SwotNotFoundError } from "../../use-cases/errors/swot-not-found-error";

export async function updateSwot(request: FastifyRequest, reply: FastifyReply)  {

    const updateSwotBodySchema = z.object({
        id: z.string(),
        strengths: z.array(z.string()).optional(),
        weaknesses: z.array(z.string()).optional(),
        opportunities: z.array(z.string()).optional(),
        threats: z.array(z.string()).optional(),
    })

    const { id,opportunities,strengths,threats,weaknesses} = updateSwotBodySchema.parse(request.body);

    try {
        const prismaSwotRepository = new PrismaSwotRepository(); 
        const updateSwotUseCase = new UpdateSwotUseCase(prismaSwotRepository);

        const { swot } = await updateSwotUseCase.execute({  id, opportunities, strengths, threats, weaknesses})

        return {
            swot,
        }
    }
    catch (err) {
            
        if( err instanceof SwotNotFoundError) {
            return reply.code(404).send({message: err.message});
        }

        throw err;

        }

}