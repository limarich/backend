import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaUsersRepository } from "../../prisma/prisma-users-repository";
import { UserNotFoundError } from "../../use-cases/errors/user-not-found-error";
import { GetUserUseCase } from "../../use-cases/getUser";
import PrismaUserRequestRepository from "../../prisma/prisma-user-request-repository";
import { GetUserRequestsUseCase } from "../../use-cases/getUserRequests";

export async function getUserRequests(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const prismaUserRequestRepository = new PrismaUserRequestRepository();
    const getUserUseCase = new GetUserRequestsUseCase(
      prismaUserRequestRepository
    );
    const { userRequests } = await getUserUseCase.execute();
    return {
      userRequests,
    };
  } catch (err) {
    throw err;
  }
}
