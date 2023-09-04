import { hash } from "bcrypt";
import { UsersRepository } from "../repositories/users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { BusinessRepository } from "../repositories/business-repository";
import { BusinessModelRepository } from "../repositories/business-model-repository";
import { SwotRepository } from "../repositories/swot-repository";
import { ActionPlanRepository } from "../repositories/action-plan-repository";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  isAdmin: boolean;
  businessName: string;
}

export class RegisterUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private businessRepository: BusinessRepository,
    private businessModelRepository: BusinessModelRepository,
    private swotRepository: SwotRepository,
    private actionPlanRepository: ActionPlanRepository
  ) {}

  async execute({
    email,
    name,
    password,
    phone,
    isAdmin,
    businessName,
  }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      phone,
      isAdmin,
    });

    const businessData = {
      name: businessName,
      phone,
      user: {
        connect: {
          id: user.id,
        },
      },
    };

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

    return {
      user,
      business,
      businessModel,
      swot,
      actionPlan,
    };
  }
}
