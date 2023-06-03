import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {

    public items: User[] = []; 

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

}