import { describe, it, expect } from "vitest";
import { InMemoryBusinessRepository } from "../repositories/in-memory/in-memory-business-repository";
import { RegisterBusinessUseCase } from "./registerBusiness";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { RegisterUseCase } from "./register";
import { InMemoryBusinessModelRepository } from "../repositories/in-memory/in-memory-business-model-repository";
import { RegisterBusinessModelUseCase } from "./registerBusinessModel";
import { BusinessModelNotFoundError } from "./errors/business-model-not-found-error";
import { GetBusinessModelUseCase } from "./getBusinessModel";

describe("get Business Model Swot use case", () => {
  it("should be able to get data", async () => {
    const businessRepository = new InMemoryBusinessRepository();
    const usersRepository = new InMemoryUsersRepository();
    const businessModelRepository = new InMemoryBusinessModelRepository();

    const registerUseCase = new RegisterUseCase(usersRepository);
    const businessUseCase = new RegisterBusinessUseCase(
      businessRepository,
      usersRepository
    );
    const registerBusinessModelUseCase = new RegisterBusinessModelUseCase(
      businessRepository,
      businessModelRepository
    );
    const getBusinessModelUseCase = new GetBusinessModelUseCase(
      businessModelRepository
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

    const { businessModel } = await registerBusinessModelUseCase.execute({
      businessId: business.id,
      mainPartnerships: ["teste"],
      mainActivities: ["teste"],
      mainResources: ["teste"],
      valueProposition: [],
      customerRelationship: [],
      channels: ["teste"],
      customerSegments: ["teste"],
      costs: [],
      revenue: ["teste"],
    });

    const response = await getBusinessModelUseCase.execute(businessModel.id);

    expect(response.businessModel.id).toEqual(expect.any(String));
  });

  it("should not be able to get data", async () => {
    const businessModelRepository = new InMemoryBusinessModelRepository();

    const getBusinessModelUseCase = new GetBusinessModelUseCase(
      businessModelRepository
    );

    await expect(() => {
      return getBusinessModelUseCase.execute("123456");
    }).rejects.toBeInstanceOf(BusinessModelNotFoundError);
  });
});
