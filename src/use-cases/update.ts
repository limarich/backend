import { hash } from "bcrypt";
import { UsersRepository } from "../repositories/users-repository";
import { UserNotFoundError } from "./errors/user-not-found-error";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface UpdateUserUseCaseRequest {
  id: string;
  name?: string;
  email: string;
  phone?: string;
  password?: string;
  password_hash?: string;
}

export class UpdateUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    id,
    name,
    email,
    password,
    phone,
  }: UpdateUserUseCaseRequest) {
    const user = await this.userRepository.findById(id);

    if (!user) throw new UserNotFoundError();

    const updatedUserData: Partial<UpdateUserUseCaseRequest> = {};

    if (name) {
      updatedUserData.name = name;
    }

    if (email) {
      const emailAlreadyExists = await this.userRepository.findByEmail(email);
      if (!!emailAlreadyExists && emailAlreadyExists.id !== id) {
        throw new UserAlreadyExistsError();
      }
      updatedUserData.email = email;
    }

    if (password) {
      updatedUserData.password_hash = await hash(password, 6);
    }

    if (phone) {
      updatedUserData.phone = phone;
    }

    const updatedUser = await this.userRepository.update(updatedUserData);

    return {
      user: updatedUser,
    };
  }
}
