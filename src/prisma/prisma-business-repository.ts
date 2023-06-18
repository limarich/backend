import { Prisma, Business } from "@prisma/client";
import { BusinessRepository } from "../repositories/business-repository";
import { prisma } from "../lib/prisma";

export class PrismaBusinessRepository implements BusinessRepository {
    async findById(id: string) {
       const business = await prisma.business.findUnique({
        where: {
                id,
            }
       })
       return business;
    }
    async create(data: Prisma.BusinessCreateInput) {
        const business = await prisma.business.create({
            data
        });
        return business;
    }

}