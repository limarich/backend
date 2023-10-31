import { Prisma, User, UserRequest } from "@prisma/client";

export interface UserRequestRepository {
  create(data: Prisma.UserRequestCreateInput): Promise<UserRequest>;
  get(): Promise<UserRequest[]>;
  remove(id: string): Promise<void>;
  findById(id: string): Promise<UserRequest | null>;
  // createUserByUserRequest(data: UserRequest): Promise<User>;
}
