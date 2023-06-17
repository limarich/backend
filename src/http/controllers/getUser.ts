import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaUsersRepository } from "../../prisma/prisma-users-repository";
import { UserNotFoundError } from "../../use-cases/errors/user-not-found-error";
import { GetUserUseCase } from "../../use-cases/getUser";

export async function getUser(request: FastifyRequest, reply: FastifyReply) {
    
    const getUserBodySchema = z.object({
        id: z.string(),
    })

    
    const { id } = getUserBodySchema.parse(request.query);
    try {
        const prismaUsersRepository = new PrismaUsersRepository(); 
        const getUserUseCase = new GetUserUseCase(prismaUsersRepository);
        const { user } = await getUserUseCase.execute({id})
        return {
            user
        };
    }
    catch (err) {
            
        if( err instanceof UserNotFoundError) {
            return reply.code(404).send({message: err.message});
        }

        throw err;

        }
}