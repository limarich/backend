import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { UserNotFoundError } from "../../use-cases/errors/user-not-found-error";

export class InMemoryUsersRepository implements UsersRepository {
    
    public items: User[] = []; 
    
    async findById(id: string){
        
        const user = await this.items.find(item => item.id === id);
        
        if(!user) return null;
        
        return user;        
    }
    async findByEmail(email: string){
        const user = this.items.find((item) => item.email === email);

        if(!user) {
            return null;
        }

        return user;
    }
    
    async create(data: Prisma.UserCreateInput) {
        const user =  {
            id: 'user-1',
            email: data.email,
            name: data.name,
            password_hash: data.password_hash,
            created_at: new Date(),
            phone: data.phone,
	        isAdmin: data.isAdmin
        }

        this.items.push(user);

        return user;
    }

    async update(data: Prisma.UserUpdateInput) {
        const { id, email, ...userData } = data;

        const updatedUser: User = {
            id: id as string,
            email: email as string,
            name: userData.name as string,
            password_hash: userData.password_hash as string,
            created_at: new Date(),
            phone: userData.phone as string,
            isAdmin: userData.isAdmin as boolean
        }

        const index = this.items.findIndex(item => item.id === updatedUser.id && item.email === updatedUser.email);

        if (index !== -1) {
            this.items[index] = updatedUser;
            return updatedUser;
        } else {
            throw new UserNotFoundError();
        }
    }

}