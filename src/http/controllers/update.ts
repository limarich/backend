import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaUsersRepository } from "../../prisma/prisma-users-repository";
import { UpdateUseCase } from "../../use-cases/update";
import { UserNotFoundError } from "../../use-cases/errors/user-not-found-error";
import { UserAlreadyExistsError } from "../../use-cases/errors/user-already-exists-error";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "process";

interface DecodedToken extends JwtPayload {
  id: string;
}

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string().min(11),
  });

  const { name, email, password, phone } = updateBodySchema.parse(request.body);
  const reqHeader = request.headers["authorization"];

  const token = (reqHeader && reqHeader.split(" ")[1]) || "";
  const secret = env.secret || "";
  const { id } = jwt.verify(token, secret) as DecodedToken;

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const updateUseCase = new UpdateUseCase(prismaUsersRepository);

    const { user } = await updateUseCase.execute({
      id,
      name,
      email,
      password,
      phone,
    });

    return {
      user,
    };
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return reply.code(404).send({ message: err.message });
    }
    if (err instanceof UserAlreadyExistsError) {
      return reply.code(404).send({ message: err.message });
    }

    throw err;
  }
}
