import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { PrismaBusinessRepository } from "../../prisma/prisma-business-repository";
import { RemoveBusinessUseCase } from "../../use-cases/removeBusiness";
import { BusinessNotFoundError } from "../../use-cases/errors/business-not-found-error";

export async function removeBusiness(request: FastifyRequest, reply: FastifyReply) {
    
    const removeBusinessBodySchema = z.object({
        id: z.string(),
    })

    
    const { id } = removeBusinessBodySchema.parse(request.query);
    try {
        const prismaBusinessRepository = new PrismaBusinessRepository(); 
        const removeBusinessUseCase = new RemoveBusinessUseCase(prismaBusinessRepository);
        
        await removeBusinessUseCase.execute(id);
        
        console.log('ok 👍')

        return;
    }
    catch (err) {
            
        if( err instanceof BusinessNotFoundError) {
            return reply.code(404).send({message: err.message});
        }

        throw err;

        }
}