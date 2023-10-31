import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "../../prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "../../use-cases/errors/user-already-exists-error";
import { PrismaBusinessRepository } from "../../prisma/prisma-business-repository";
import { PrismaActionPlanRepository } from "../../prisma/prisma-action-plan-repository";
import { PrismaBusinessModelRepository } from "../../prisma/prisma-business-model-repository";
import { PrismaSwotRepository } from "../../prisma/prisma-swot-repository";
import { RegisterUserByUserRequestUseCase } from "../../use-cases/registerUserByUserRequest";
import PrismaUserRequestRepository from "../../prisma/prisma-user-request-repository";
import { UserRequestNotFoundError } from "../../use-cases/errors/user-request-not-found-error";

export async function registerUserByUserRequest(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerBodySchema = z.object({
    id: z.string(),
  });

  const { id } = registerBodySchema.parse(request.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const prismaBusinessRepository = new PrismaBusinessRepository();
    const prismaBusinessModelRepository = new PrismaBusinessModelRepository();
    const prismaSwotRepository = new PrismaSwotRepository();
    const prismaActionPlanRepository = new PrismaActionPlanRepository();
    const prismaUserRequestRepository = new PrismaUserRequestRepository();
    const registerUserByUserRequestUseCase =
      new RegisterUserByUserRequestUseCase(
        prismaUsersRepository,
        prismaBusinessRepository,
        prismaBusinessModelRepository,
        prismaSwotRepository,
        prismaActionPlanRepository,
        prismaUserRequestRepository
      );

    await registerUserByUserRequestUseCase.execute(id);
  } catch (err) {
    if (err instanceof UserRequestNotFoundError) {
      return reply.code(409).send({ message: err.message });
    }

    if (err instanceof UserAlreadyExistsError) {
      return reply.code(409).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
