
import { describe, it, expect} from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcrypt';
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';


describe('Register use case', () => {

    it('should be able to register', async () => {

        const usersRepository = new InMemoryUsersRepository() 
        const registerUseCase = new RegisterUseCase(usersRepository);

        const {user} = await registerUseCase.execute({
            name: 'Rich',
            email: 'envkt@example.com',
            password: '123456',
            isAdmin: false,
            phone: '(22) 98180-5474'
        })

        expect(user.id).toEqual(expect.any(String));
    })

    it('should hash user password upon registration', async () => {

        const usersRepository = new InMemoryUsersRepository() 
        const registerUseCase = new RegisterUseCase(usersRepository);

        const {user} = await registerUseCase.execute({
            name: 'Rich',
            email: 'envkt@example.com',
            password: '123456',
            isAdmin: false,
            phone: '(22) 98180-5474'
        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash
        )

        expect(isPasswordCorrectlyHashed).toBe(true);
    })

    it('should not be able to register with same email twice', async () => {
        const usersRepository = new InMemoryUsersRepository() 
        const registerUseCase = new RegisterUseCase(usersRepository);

        const email = 'envkt@example.com';

        await registerUseCase.execute({
            name: 'Rich',
            email: 'envkt@example.com',
            password: '123456',
            isAdmin: false,
            phone: '(22) 98180-5474'
        })

        await expect(() => {
            return registerUseCase.execute({
                name: 'Rich',
                email: 'envkt@example.com',
                password: '123456',
                isAdmin: false,
                phone: '(22) 98180-5474'
            });
        }).rejects.toBeInstanceOf(UserAlreadyExistsError);
    })
})
