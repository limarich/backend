import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import PrismaUserRequestRepository from "../../prisma/prisma-user-request-repository";
import { RemoveUserRequestUseCase } from "../../use-cases/removeUserRequest";
import { UserRequestNotFoundError } from "../../use-cases/errors/user-request-not-found-error";

export async function removeUserRequest(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const removeUserRequestBodySchema = z.object({
    id: z.string(),
  });

  const { id } = removeUserRequestBodySchema.parse(request.body);
  try {
    const prismaUserRequestRepository = new PrismaUserRequestRepository();
    const removeUserRequestUseCase = new RemoveUserRequestUseCase(
      prismaUserRequestRepository
    );
    await removeUserRequestUseCase.execute(id);

    console.log("ok 👍");

    return;
  } catch (err) {
    if (err instanceof UserRequestNotFoundError) {
      return reply.code(404).send({ message: err.message });
    }
    throw err;
  }
}
