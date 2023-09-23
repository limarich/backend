import {
  ActionPlan,
  Address,
  Business,
  BusinessModel,
  Prisma,
  Swot,
} from "@prisma/client";

interface FindBusinessResponse extends Business {
  address: Address | null;
  businessModel: BusinessModel | null;
  actionPlan: ActionPlan | null;
  swot: Swot | null;
}

export interface BusinessRepository {
  create(data: Prisma.BusinessCreateInput): Promise<Business>;
  findById(id: string): Promise<FindBusinessResponse | null>;
  update(id: string, data: Prisma.BusinessUpdateInput): Promise<Business>;
  remove(id: string): Promise<void>;
}
