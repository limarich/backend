import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaBusinessRepository } from "../../prisma/prisma-business-repository";
import { RegisterBusinessUseCase } from "../../use-cases/registerBusiness";
import { PrismaUsersRepository } from "../../prisma/prisma-users-repository";
import { UserNotFoundError } from "../../use-cases/errors/user-not-found-error";

export async function RegisterBusiness(request: FastifyRequest, reply: FastifyReply) {

    const registerBodySchema = z.object({
        name: z.string(),
        phone: z.string().min(11),
        website: z.string().optional(),
        userId: z.string(),
        addressId: z.string()
    })

    const { name, phone, userId, addressId, website } = registerBodySchema.parse(request.body);

    try {

        const prismaBusinessRepository = new PrismaBusinessRepository(); 
        const prismaUsersRepository = new PrismaUsersRepository(); 
        const registerBusinessUseCase = new RegisterBusinessUseCase(prismaBusinessRepository, prismaUsersRepository);

        await registerBusinessUseCase.execute({ name, phone, userId, addressId, website})
    } catch (err) {

        if(err instanceof UserNotFoundError) {
            return reply.code(404).send({ message: err.message});
        }

        throw err;
    }

}