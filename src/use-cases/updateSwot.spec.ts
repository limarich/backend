import { describe, it, expect } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { RegisterUseCase } from "./register";
import { InMemoryBusinessRepository } from "../repositories/in-memory/in-memory-business-repository";
import { RegisterBusinessUseCase } from "./registerBusiness";
import { InMemorySwotRepository } from "../repositories/in-memory/in-memory-swot-repository";
import { UpdateSwotUseCase } from "./updateSwot";
import { RegisterSwotUseCase } from "./registerSwot";

describe("Update swot use case", () => {
  it("should be able to update", async () => {
    const businessRepository = new InMemoryBusinessRepository();
    const userRepository = new InMemoryUsersRepository();
    const swotRepository = new InMemorySwotRepository();

    const registerSwotUseCase = new RegisterSwotUseCase(
      swotRepository,
      businessRepository
    );
    const registerUserUseCase = new RegisterUseCase(userRepository);
    const registerBusinessUseCase = new RegisterBusinessUseCase(
      businessRepository,
      userRepository
    );
    const updateSwotUseCase = new UpdateSwotUseCase(swotRepository);

    const { user } = await registerUserUseCase.execute({
      name: "Rich",
      email: "envkt@example.com",
      password: "123456",
      isAdmin: false,
      phone: "(22) 98180-5474",
    });

    const { business } = await registerBusinessUseCase.execute({
      name: "Business",
      phone: "123456",
      website: "http://www.example.com",
      userId: user.id,
    });
    const { swot } = await registerSwotUseCase.execute({
      businessId: business.id,
      opportunities: [],
      strengths: [],
      threats: [],
      weaknesses: [],
    });
    const response = await updateSwotUseCase.execute({
      id: swot.id,
      opportunities: [],
      strengths: [],
      threats: [],
      weaknesses: [],
    });

    expect(response.swot.id).toEqual(expect.any(String));
  });
});
