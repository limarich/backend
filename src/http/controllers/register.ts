import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterUseCase } from "../../use-cases/register";
import { PrismaUsersRepository } from "../../prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "../../use-cases/erros/user-already-exists-error";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        phone: z.string().min(11),
        isAdmin: z.boolean(),
    })

    const { name, email, password, phone, isAdmin } = registerBodySchema.parse(request.body);

    try {
        const prismaUsersRepository = new PrismaUsersRepository(); 
        const registerUseCase = new RegisterUseCase(prismaUsersRepository);
        
        await registerUseCase.execute({name, email, password, phone, isAdmin});

    } catch (err) {

        if(err instanceof UserAlreadyExistsError) {
            
            return reply.code(409).send({message: err.message});
        }
        
        throw err;
    }
    

    return reply.status(201).send();
}