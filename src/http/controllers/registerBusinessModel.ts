import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaBusinessRepository } from "../../prisma/prisma-business-repository";
import { PrismaBusinessModelRepository } from "../../prisma/prisma-business-model-repository";
import { RegisterBusinessModelUseCase } from "../../use-cases/registerBusinessModel";
import { BusinessNotFoundError } from "../../use-cases/errors/business-not-found-error";

export async function RegisterBusinessModel(request: FastifyRequest, reply: FastifyReply) {

    const registerBodySchema = z.object({
        mainPartnerships:    z.array(z.string()),
        mainActivities :     z.array(z.string()),
        mainResources :      z.array(z.string()),
        valueProposition :   z.array(z.string()),
        customerRelationship :z.array(z.string()),
        channels :           z.array(z.string()),
        customerSegments :   z.array(z.string()),
        costs  :             z.array(z.string()),
        revenue :            z.array(z.string()),
        businessId: z.string()
    })

    const { businessId, channels,costs,customerRelationship,customerSegments,mainActivities,mainPartnerships,mainResources,revenue,valueProposition } = registerBodySchema.parse(request.body);

    try {

        const prismaBusinessRepository = new PrismaBusinessRepository(); 
        const prismaBusinessModelRepository = new PrismaBusinessModelRepository(); 
        const registerBusinessUseCase = new RegisterBusinessModelUseCase(prismaBusinessRepository, prismaBusinessModelRepository);

        await registerBusinessUseCase.execute({ businessId, channels,costs,customerRelationship,customerSegments,mainActivities,mainPartnerships,mainResources,revenue,valueProposition })
    } catch (err) {

        if(err instanceof BusinessNotFoundError) {
            return reply.code(404).send({ message: err.message});
        }

        throw err;
    }

}