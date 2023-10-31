import { UserRequestRepository } from "../repositories/user-request-repository";
import { UserRequestNotFoundError } from "./errors/user-request-not-found-error";

export class RemoveUserRequestUseCase {
  constructor(private userRequest: UserRequestRepository) {}

  async execute(id: string) {
    const userRequest = await this.userRequest.findById(id);

    if (!userRequest) throw new UserRequestNotFoundError();
    return this.userRequest.remove(id);
  }
}
