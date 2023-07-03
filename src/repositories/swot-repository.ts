import { Prisma, Swot } from "@prisma/client";

export interface SwotRepository {
    create(data: Prisma.SwotCreateInput): Promise<Swot>;
    findById(id: string): Promise<Swot| null>;
    update(id: string, data: Prisma.SwotUpdateInput): Promise<Swot>;
}