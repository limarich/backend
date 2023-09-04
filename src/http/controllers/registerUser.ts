import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterUseCase } from "../../use-cases/register";
import { PrismaUsersRepository } from "../../prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "../../use-cases/errors/user-already-exists-error";
import { PrismaBusinessRepository } from "../../prisma/prisma-business-repository";
import { PrismaActionPlanRepository } from "../../prisma/prisma-action-plan-repository";
import { PrismaBusinessModelRepository } from "../../prisma/prisma-business-model-repository";
import { PrismaSwotRepository } from "../../prisma/prisma-swot-repository";

export async function registerUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string().min(11),
    isAdmin: z.boolean(),
    businessName: z.string(),
  });

  const { name, email, password, phone, isAdmin, businessName } =
    registerBodySchema.parse(request.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const prismaBusinessRepository = new PrismaBusinessRepository();
    const prismaBusinessModelRepository = new PrismaBusinessModelRepository();
    const prismaSwotRepository = new PrismaSwotRepository();
    const prismaActionPlanRepository = new PrismaActionPlanRepository();
    const registerUseCase = new RegisterUseCase(
      prismaUsersRepository,
      prismaBusinessRepository,
      prismaBusinessModelRepository,
      prismaSwotRepository,
      prismaActionPlanRepository
    );

    await registerUseCase.execute({
      name,
      email,
      password,
      phone,
      isAdmin,
      businessName,
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.code(409).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
