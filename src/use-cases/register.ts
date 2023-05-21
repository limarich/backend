import { hash } from "bcrypt";
import { prisma } from "../lib/prisma";
import { PrismaUsersRepository } from "../repositories/prisma-users-repository";

interface RegisterUseCase {
    name: string;
    email: string;
    password: string;
}

export async function registerUseCase({email,name,password}:RegisterUseCase) {
    const password_hash =  await hash(password, 6);

    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(userWithSameEmail) {
        throw new Error('Email already exists!');
    }

    const prismaUsersRepository = new PrismaUsersRepository();

    await prismaUsersRepository.create({
        name, email, password_hash
    })
}