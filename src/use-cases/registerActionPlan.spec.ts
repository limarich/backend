import { describe, it, expect } from "vitest";
import { InMemoryBusinessRepository } from "../repositories/in-memory/in-memory-business-repository";
import { RegisterBusinessUseCase } from "./registerBusiness";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { RegisterUseCase } from "./register";
import { InMemorySwotRepository } from "../repositories/in-memory/in-memory-swot-repository";
import { RegisterSwotUseCase } from "./registerSwot";
import { BusinessNotFoundError } from "./errors/business-not-found-error";
import { InMemoryActionPlanRepository } from "../repositories/in-memory/in-memory-action-plan-repository";
import { RegisterActionPlanUseCase } from "./registerActionPlan";

describe("Register Swot use case", () => {
  it("should be able to register", async () => {
    const businessRepository = new InMemoryBusinessRepository();
    const usersRepository = new InMemoryUsersRepository();
    const actionPlanRepository = new InMemoryActionPlanRepository();

    const registerUseCase = new RegisterUseCase(usersRepository);
    const businessUseCase = new RegisterBusinessUseCase(
      businessRepository,
      usersRepository
    );
    const registerActionPlanUseCase = new RegisterActionPlanUseCase(
      actionPlanRepository,
      businessRepository
    );

    const { user } = await registerUseCase.execute({
      email: "user@example.com",
      name: "user example",
      password: "123456",
      phone: "1234567910",
      isAdmin: false,
    });

    const { business } = await businessUseCase.execute({
      name: "Rich",
      phone: "(22) 98180-5474",
      userId: user.id,
      addressId: "address-1",
      website: "www.rich.com",
    });

    const { actionPlan } = await registerActionPlanUseCase.execute({
      businessId: business.id,
      items: [],
    });

    expect(actionPlan.id).toEqual(expect.any(String));
  });

  it("should not be able to register", async () => {
    const swotRepository = new InMemorySwotRepository();
    const businessRepository = new InMemoryBusinessRepository();

    const registerActionPlanUseCase = new RegisterSwotUseCase(
      swotRepository,
      businessRepository
    );

    try {
      await registerActionPlanUseCase.execute({
        businessId: "asdas",
        items: [],
      });
    } catch (error) {
      expect(error).toBeInstanceOf(BusinessNotFoundError);
    }
  });
});
