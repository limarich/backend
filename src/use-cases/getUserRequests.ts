import { UserRequestRepository } from "../repositories/user-request-repository";

export class GetUserRequestsUseCase {
  constructor(private userRequestRepository: UserRequestRepository) {}

  async execute() {
    const userRequests = await this.userRequestRepository.get();

    return {
      userRequests,
    };
  }
}
