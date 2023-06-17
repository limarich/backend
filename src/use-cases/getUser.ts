import { hash } from "bcrypt";
import { UsersRepository } from "../repositories/users-repository";
import { UserNotFoundError } from "./errors/user-not-found-error";

interface GetUserUseCaseRequest {
    id: string;
}

export class GetUserUseCase {

    constructor(private userRepository: UsersRepository){}

    async execute({ id }: GetUserUseCaseRequest) {

        const user = await this.userRepository.findById(id);

        return {
            user
        }
    }
}