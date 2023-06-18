import { Prisma, User } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { UsersRepository } from "../repositories/users-repository";

export class PrismaUsersRepository implements UsersRepository {
    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user  = await prisma.user.create({
          data
        });
        return user;
    }
    async findByEmail(email: string){
       const user =  await prisma.user.findUnique({
            where: {
                email,
            }
        }) 

    return user;
    }
    async findById(id: string){
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        return user;
    }
    async update(data: Prisma.UserUpdateInput) {
        const { id, email, ...userData } = data;

        const user = await prisma.user.update({
          data: {
            ...userData,
          },
          where: {
            id: id as string,
            email: email as string,
          },
        });
      
        return user;
      }
}