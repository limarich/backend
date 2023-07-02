
import { describe, it, expect} from 'vitest';
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository';
import { UpdateUseCase } from './update';
import { RegisterUseCase } from './register';


describe('Update use case', () => {

    it('should be able to update', async () => {

        const usersRepository = new InMemoryUsersRepository(); 

        const updateUseCase = new UpdateUseCase(usersRepository);
        const registerUseCase = new RegisterUseCase(usersRepository);

        const {user} = await registerUseCase.execute({
            name: 'Rich',
            email: 'envkt@example.com',
            password: '123456',
            isAdmin: false,
            phone: '(22) 98180-5474'
        });

        const response = await updateUseCase.execute({
            id: 'user-1',
            name: 'Rich',
            email: 'envkt@example.com',
            password: '123456',
            isAdmin: false,
            phone: '(22) 98180-5474',
        })

        expect(response.user.id).toEqual(expect.any(String));
    })
})
