import { hash } from "bcrypt";
import { prisma } from "../lib/prisma";

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

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash,
        }
    })
}