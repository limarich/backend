import { describe, it, expect } from "vitest";
import { RegisterUseCase } from "./register";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { InMemoryBusinessRepository } from "../repositories/in-memory/in-memory-business-repository";
import { RegisterBusinessUseCase } from "./registerBusiness";
import { InMemorySwotRepository } from "../repositories/in-memory/in-memory-swot-repository";
import { RegisterSwotUseCase } from "./registerSwot";
import { GetSwotUseCase } from "./getSwot";
import { SwotNotFoundError } from "./errors/swot-not-found-error";

describe("Get swot data use case", () => {
  it("should be able to get Data", async () => {
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
    const getSwotUseCase = new GetSwotUseCase(swotRepository);

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

    const { swot: swotResponse } = await getSwotUseCase.execute(swot.id);

    expect(swotResponse.id).toEqual(expect.any(String));
  });

  it("should be not able to get Data", async () => {
    const swotRepository = new InMemorySwotRepository();

    const getSwotUseCase = new GetSwotUseCase(swotRepository);

    await expect(() => {
      return getSwotUseCase.execute("asdasda");
    }).rejects.toBeInstanceOf(SwotNotFoundError);
  });
});
