import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaUsersRepository } from "../../prisma/prisma-users-repository";
import { UpdateUseCase } from "../../use-cases/update";
import { UserNotFoundError } from "../../use-cases/errors/user-not-found-error";

export async function update(request: FastifyRequest, reply: FastifyReply)  {

    const updateBodySchema = z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        phone: z.string().min(11),
        isAdmin: z.boolean(),
    })

    const { name, email, password, phone, isAdmin, id} = updateBodySchema.parse(request.body);

    try {
        const prismaUsersRepository = new PrismaUsersRepository(); 
        const updateUseCase = new UpdateUseCase(prismaUsersRepository);

        const {user} = await updateUseCase.execute({ name, email, password, phone, isAdmin, id})

        return {
            user,
        }
    }
    catch (err) {
            
        if( err instanceof UserNotFoundError) {
            return reply.code(404).send({message: err.message});
        }

        throw err;

        }

}