import { Prisma, Business } from "@prisma/client";
import { BusinessRepository } from "../repositories/business-repository";
import { prisma } from "../lib/prisma";
import { BusinessNotFoundError } from "../use-cases/errors/business-not-found-error";

export class PrismaBusinessRepository implements BusinessRepository {
  async findById(id: string) {
    const business = await prisma.business.findUnique({
      where: {
        id,
      },
      include: {
        businessModel: true,
        actionPlan: true,
        address: true,
        swot: true,
      },
    });
    return business;
  }
  async create(data: Prisma.BusinessCreateInput) {
    const business = await prisma.business.create({
      data,
    });
    return business;
  }
  async update(id: string, data: Prisma.BusinessUpdateInput) {
    const business = await prisma.business.update({
      where: {
        id,
      },
      data,
    });

    return business;
  }
  async remove(id: string) {
    // Remover registros relacionados na tabela swot
    await prisma.swot.deleteMany({
      where: {
        businessId: id,
      },
    });

    // Remover o registro da tabela business
    await prisma.business.delete({
      where: {
        id,
      },
    });
    console.log("removido");
    return;
  }
}
