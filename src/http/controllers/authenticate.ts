import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterUseCase } from "../../use-cases/register";
import { PrismaUsersRepository } from "../../prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "../../use-cases/errors/user-already-exists-error";
import { AuthenticateUseCase } from "../../use-cases/authenticate";
import { InvalidCredentialsError } from "../../use-cases/errors/invalid-credentials-error";
import { env } from "process";
import jwt from "jsonwebtoken";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);

    const { user } = await authenticateUseCase.execute({ email, password });

    try {
      const secret = env.secret || "";

      const token = jwt.sign(
        {
          id: user.id,
        },
        secret
      );

      return reply.code(200).send({
        token,
      });
    } catch (err) {
      return reply.code(500).send({ message: err });
    }
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.code(409).send({ message: err.message });
    }

    throw err;
  }
}
