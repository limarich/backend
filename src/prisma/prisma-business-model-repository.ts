import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { BusinessModelRepository } from "../repositories/business-model-repository";

export class PrismaBusinessModelRepository implements BusinessModelRepository {
    async create(data: Prisma.BusinessModelCreateInput) {
        const businessModel = await prisma.businessModel.create({
            data
        });
        return businessModel;
    }

}