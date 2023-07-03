import { BusinessModel, Prisma } from "@prisma/client";

export interface BusinessModelRepository {
  create(data: Prisma.BusinessModelCreateInput): Promise<BusinessModel>;
  findByBusinessId(businessId: string): Promise<BusinessModel | null>;
  findById(businessId: string): Promise<BusinessModel | null>;
}
