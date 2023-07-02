
import { describe, it, expect} from 'vitest';
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository';
import { UpdateUseCase } from './update';
import { RegisterUseCase } from './register';
import { InMemoryBusinessRepository } from '../repositories/in-memory/in-memory-business-repository';
import { UpdateBusinessUseCase } from './updateBusiness';
import { RegisterBusinessUseCase } from './registerBusiness';


describe('Update Business use case', () => {

    it('should be able to update', async () => {

        const businessRepository = new InMemoryBusinessRepository(); 
        const userRepository = new InMemoryUsersRepository(); 

        const updateBusinessUseCase = new UpdateBusinessUseCase(businessRepository);
        const registerUserUseCase = new RegisterUseCase(userRepository);
        const registerBusinessUseCase = new RegisterBusinessUseCase(businessRepository, userRepository);

        const {user} = await registerUserUseCase.execute({
            name: 'Rich',
            email: 'envkt@example.com',
            password: '123456',
            isAdmin: false,
            phone: '(22) 98180-5474'
        });

        const {business} = await registerBusinessUseCase.execute({
            name: 'Business', 
            phone: '123456',
            website: 'http://www.example.com',
            userId: user.id,
        });
        const response = await updateBusinessUseCase.execute({
           id: business.id,
            name: 'New Name',
            phone: '123456',
            website: 'http://www.example.com',
            userId: user.id,
        })

        console.log('aaa',business.id);
        expect(response.business.id).toEqual(expect.any(String));
    })
})
