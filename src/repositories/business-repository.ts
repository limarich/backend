import { Business, Prisma } from "@prisma/client";

export interface BusinessRepository {
    create(data: Prisma.BusinessCreateInput): Promise<Business>;
    findById(id: string): Promise<Business | null>;
}