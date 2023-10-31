import { hash } from "bcrypt";
import { UserRequestRepository } from "../repositories/user-request-repository";
import { Prisma } from "@prisma/client";

interface RegisterSwotRequest {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  businessPhone: string;
  password: string;
  businessWebsite?: string;
  businessDescription?: string;
}

export class RegisterUserRequestUseCase {
  constructor(private userRequestRepository: UserRequestRepository) {}

  async execute({
    businessName,
    businessPhone,
    email,
    name,
    phone,
    password,
    businessDescription,
    businessWebsite,
  }: RegisterSwotRequest) {
    const password_hash = await hash(password, 6);
    const userRequestInput: Prisma.UserRequestCreateInput = {
      businessName,
      businessPhone,
      email,
      name,
      phone,
      password: password_hash,
    };
    if (businessDescription) {
      userRequestInput.businessDescription = businessDescription;
    }
    if (businessWebsite) {
      userRequestInput.businessWebsite = businessWebsite;
    }
    const userRequest = await this.userRequestRepository.create(
      userRequestInput
    );
    return {
      userRequest,
    };
  }
}
