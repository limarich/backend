
import { describe, it, expect} from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcrypt';
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { GetUserUseCase } from './getUser';


describe('Get user data use case', () => {

    it('should be able to get Data', async () => {

        const usersRepository = new InMemoryUsersRepository() 
        const getUserUseCase = new GetUserUseCase(usersRepository);

        const registerUseCase = new RegisterUseCase(usersRepository);

        const {user} = await registerUseCase.execute({
            name: 'Rich',
            email: 'envkt@example.com',
            password: '123456',
            isAdmin: false,
            phone: '(22) 98180-5474'
        });


        const response = await getUserUseCase.execute({
           id: user.id,
        })

        expect(response.user?.id).toEqual(expect.any(String));
    })

    it('should be not able to get Data', async () => {

        const usersRepository = new InMemoryUsersRepository() 
        const getUserUseCase = new GetUserUseCase(usersRepository);
        const registerUseCase = new RegisterUseCase(usersRepository);

        await registerUseCase.execute({
            name: 'Rich',
            email: 'envkt@example.com',
            password: '123456',
            isAdmin: false,
            phone: '(22) 98180-5474'
        })

        const response = await getUserUseCase.execute({
           id: 'asdasdasdas',
        })

        expect(response.user).toBeNull();
    })


})
