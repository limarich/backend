import { BusinessModel, Prisma } from "@prisma/client";

export interface BusinessModelRepository {
    create(data:Prisma.BusinessModelCreateInput):Promise<BusinessModel>
}