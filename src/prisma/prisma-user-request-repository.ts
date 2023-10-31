import { Prisma, User, UserRequest } from "@prisma/client";
import { UserRequestRepository } from "../repositories/user-request-repository";
import { prisma } from "../lib/prisma";

export default class PrismaUserRequestRepository
  implements UserRequestRepository
{
  // async createUserByUserRequest(data: UserRequest): Promise<User> {
  //   const user = await prisma.user.create({
  //     data: {
  //       email: data.email,
  //       isAdmin: false,
  //       name: data.name,
  //       password_hash: data.password,
  //       phone: data.phone,
  //     }
  //   });
  //   const business = await prisma.business.create({
  //     data: {

  //     }
  //   })
  //   return user;
  // }
  async findById(id: string) {
    const userRequest = await prisma.userRequest.findUnique({
      where: {
        id,
      },
    });
    return userRequest;
  }
  async create(data: Prisma.UserRequestCreateInput): Promise<UserRequest> {
    const userRequest = await prisma.userRequest.create({ data });
    return userRequest;
  }
  async get(): Promise<UserRequest[]> {
    const userRequests = await prisma.userRequest.findMany();
    return userRequests;
  }
  async remove(id: string) {
    // Remover registros relacionados na tabela swot
    await prisma.userRequest.deleteMany({
      where: {
        id: id,
      },
    });
  }
}
