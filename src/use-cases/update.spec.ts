
import { describe, it, expect} from 'vitest';
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository';
import { UpdateUseCase } from './update';


describe('Update use case', () => {

    it('should be able to update', async () => {

        const usersRepository = new InMemoryUsersRepository() 
        const updateUseCase = new UpdateUseCase(usersRepository);

        const {user} = await updateUseCase.execute({
            name: 'Rich',
            email: 'envkt@example.com',
            password: '123456',
            isAdmin: false,
            phone: '(22) 98180-5474',
            id: 'user-1'
        })

        expect(user.id).toEqual(expect.any(String));
    })
})
