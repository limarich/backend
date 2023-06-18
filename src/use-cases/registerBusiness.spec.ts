
import { describe, it, expect} from 'vitest';
import { InMemoryBusinessRepository } from '../repositories/in-memory/in-memory-business-repository';
import { RegisterBusinessUseCase } from './registerBusiness';
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository';
import { RegisterUseCase } from './register';
import { UserNotFoundError } from './errors/user-not-found-error';


describe('Register Business use case', () => {

    it('should be able to register', async () => {

        const businessRepository = new InMemoryBusinessRepository();
        const usersRepository = new InMemoryUsersRepository();

        const registerUseCase = new RegisterUseCase(usersRepository);
        const businessUseCase = new RegisterBusinessUseCase(businessRepository,usersRepository );

        const {user} = await registerUseCase.execute({
            email: 'user@example.com', 
            name: 'user example',
            password: '123456',
            phone: '1234567910',
            isAdmin: false,
        })

        const {business} = await businessUseCase.execute({
            name: 'Rich',
            phone: '(22) 98180-5474',
            userId: user.id,
            addressId: 'address-1',
            website: 'www.rich.com'
        })

        expect(business.id).toEqual(expect.any(String));
    })

    it('should not be able to register', async () => {

        const businessRepository = new InMemoryBusinessRepository();
        const usersRepository = new InMemoryUsersRepository();

        const businessUseCase = new RegisterBusinessUseCase(businessRepository,usersRepository );

        try {
            await businessUseCase.execute({
              name: 'Rich',
              phone: '(22) 98180-5474',
              userId: 'sadasdas',
              addressId: 'address-1',
              website: 'www.rich.com',
            });
          } catch (error) {
            expect(error).toBeInstanceOf(UserNotFoundError);
          }
    })
})
