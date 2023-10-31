import { UsersRepository } from "../repositories/users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { BusinessRepository } from "../repositories/business-repository";
import { BusinessModelRepository } from "../repositories/business-model-repository";
import { SwotRepository } from "../repositories/swot-repository";
import { ActionPlanRepository } from "../repositories/action-plan-repository";
import { Prisma, UserRequest } from "@prisma/client";
import { UserRequestRepository } from "../repositories/user-request-repository";
import { UserRequestNotFoundError } from "./errors/user-request-not-found-error";

export class RegisterUserByUserRequestUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private businessRepository: BusinessRepository,
    private businessModelRepository: BusinessModelRepository,
    private swotRepository: SwotRepository,
    private actionPlanRepository: ActionPlanRepository,
    private userRequest: UserRequestRepository
  ) {}

  async execute(id: string) {
    const userRequest = await this.userRequest.findById(id);

    if (!userRequest) {
      throw new UserRequestNotFoundError();
    }

    const userWithSameEmail = await this.usersRepository.findByEmail(
      userRequest.email
    );

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name: userRequest.name,
      email: userRequest.email,
      password_hash: userRequest.password,
      phone: userRequest.phone,
      isAdmin: false,
    });

    const businessData: Prisma.BusinessCreateInput = {
      name: userRequest.businessName,
      phone: userRequest.businessPhone,
      user: {
        connect: {
          id: user.id,
        },
      },
    };
    if (userRequest.businessWebsite) {
      businessData.website = userRequest.businessWebsite;
    }

    const business = await this.businessRepository.create(businessData);

    const businessModel = await this.businessModelRepository.create({
      business: {
        connect: {
          id: business.id,
        },
      },
    });
    const swot = await this.swotRepository.create({
      business: {
        connect: {
          id: business.id,
        },
      },
    });

    const actionPlan = await this.actionPlanRepository.create({
      business: {
        connect: {
          id: business.id,
        },
      },
    });

    await this.userRequest.remove(id);

    return {
      user,
      business,
      businessModel,
      swot,
      actionPlan,
    };
  }
}
