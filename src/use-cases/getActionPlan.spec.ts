import { describe, it, expect } from "vitest";
import { RegisterUseCase } from "./register";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { InMemoryBusinessRepository } from "../repositories/in-memory/in-memory-business-repository";
import { RegisterBusinessUseCase } from "./registerBusiness";
import { InMemoryActionPlanRepository } from "../repositories/in-memory/in-memory-action-plan-repository";
import { RegisterActionPlanUseCase } from "./registerActionPlan";
import { GetActionPlanUseCase } from "./getActionPlan";
import { ActionPlanNotFoundError } from "./errors/action-plan-not-found-error";

describe("Get Action plan data use case", () => {
  it("should be able to get Data", async () => {
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
    const getActionPlanUseCase = new GetActionPlanUseCase(actionPlanRepository);

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

    const response = await getActionPlanUseCase.execute(actionPlan.id);

    expect(response.actionPlan.id).toEqual(expect.any(String));
  });

  it("should be not able to get Data", async () => {
    const actionPlanRepository = new InMemoryActionPlanRepository();
    const getActionPlanUseCase = new GetActionPlanUseCase(actionPlanRepository);

    await expect(() => {
      return getActionPlanUseCase.execute("asdasda");
    }).rejects.toBeInstanceOf(ActionPlanNotFoundError);
  });
});
