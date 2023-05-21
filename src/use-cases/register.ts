import { hash } from "bcrypt";
import { prisma } from "../lib/prisma";
import { UserRepository } from "../repositories/users-repository";

interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
}


export class RegisterUseCase {

    constructor(private usersRepository: UserRepository){}

     async execute({email,name,password}:RegisterUseCaseRequest) {
        const password_hash =  await hash(password, 6);
    
        const userWithSameEmail = await this.usersRepository.findByEmail(email);
    
        if(userWithSameEmail) {
            throw new Error('Email already exists!');
        }
    
    
        await this.usersRepository.create({
            name, email, password_hash
        })
    }
}

