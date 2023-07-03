import { BusinessModel, Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { BusinessModelRepository } from "../repositories/business-model-repository";

export class PrismaBusinessModelRepository implements BusinessModelRepository {
  async create(data: Prisma.BusinessModelCreateInput) {
    const businessModel = await prisma.businessModel.create({
      data,
    });
    return businessModel;
  }
  async findByBusinessId(businessId: string) {
    const businessModel = await prisma.businessModel.findUnique({
      where: {
        businessId,
      },
    });
    return businessModel;
  }
  async findById(id: string) {
    const businessModel = await prisma.businessModel.findUnique({
      where: {
        id,
      },
    });
    return businessModel;
  }
}
