import { User } from "@prisma/client";
import { UsersRepository } from "../repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcrypt";

interface AuthenticateUseRequest {
    email: string;
    password: string;
}
interface AuthenticateUseCaseResponse {
    user: User;
}

export class AuthenticateUseCase {

    constructor(private usersRepository: UsersRepository){}

    async execute({
        email, password
    }: AuthenticateUseRequest): Promise<AuthenticateUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new InvalidCredentialsError();
        }

        const doesPasswordsMatch = await compare(password, user.password_hash);

        if(!doesPasswordsMatch) {
            throw new InvalidCredentialsError();
        }
        return {
            user
        }
    } 
}