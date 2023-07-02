import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UpdateBusinessUseCase } from "../../use-cases/updateBusiness";
import { PrismaBusinessRepository } from "../../prisma/prisma-business-repository";
import { BusinessNotFoundError } from "../../use-cases/errors/business-not-found-error";

export async function updateBusiness(request: FastifyRequest, reply: FastifyReply)  {

    const updateBusinessBodySchema = z.object({
        id: z.string(),
        name: z.string().optional(),
        website: z.string().optional(),
        phone: z.string().min(11).optional(),
        userId: z.string().optional(),
        addressId: z.string().optional(),
    })

    const { name, id, addressId,phone, userId, website} = updateBusinessBodySchema.parse(request.body);

    try {
        const prismaUsersRepository = new PrismaBusinessRepository(); 
        const updateBusinessUseCase = new UpdateBusinessUseCase(prismaUsersRepository);

        const {business} = await updateBusinessUseCase.execute({  name, id, addressId,phone, userId, website})

        return {
            business,
        }
    }
    catch (err) {
            
        if( err instanceof BusinessNotFoundError) {
            return reply.code(404).send({message: err.message});
        }

        throw err;

        }

}