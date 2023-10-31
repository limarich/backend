import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import PrismaUserRequestRepository from "../../prisma/prisma-user-request-repository";
import { RegisterUserRequestUseCase } from "../../use-cases/registerUserRequest";

export async function registerUserRequest(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string().min(11),
    businessName: z.string(),
    businessPhone: z.string().min(11),
    businessWebsite: z.string().optional(),
    businessDescription: z.string().optional(),
  });

  const {
    name,
    email,
    password,
    phone,
    businessName,
    businessPhone,
    businessWebsite,
    businessDescription,
  } = registerBodySchema.parse(request.body);

  try {
    const prismaUserRequestRepository = new PrismaUserRequestRepository();

    const registerUseCase = new RegisterUserRequestUseCase(
      prismaUserRequestRepository
    );

    await registerUseCase.execute({
      name,
      email,
      password,
      phone,
      businessName,
      businessPhone,
      businessWebsite,
      businessDescription,
    });
  } catch (err) {
    throw err;
  }

  return reply.status(201).send();
}
