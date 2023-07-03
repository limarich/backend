
import { describe, it, expect} from 'vitest';
import { InMemoryBusinessRepository } from '../repositories/in-memory/in-memory-business-repository';
import { RegisterBusinessUseCase } from './registerBusiness';
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository';
import { RegisterUseCase } from './register';
import { InMemorySwotRepository } from '../repositories/in-memory/in-memory-swot-repository';
import { BusinessNotFoundError } from './errors/business-not-found-error';
import { RemoveBusinessUseCase } from './removeBusiness';


describe('remove Business use case', () => {

    it('should be able to remove', async () => {

        const businessRepository = new InMemoryBusinessRepository();
        const usersRepository = new InMemoryUsersRepository();
        const swotRepository = new InMemorySwotRepository();

        const registerUseCase = new RegisterUseCase(usersRepository);
        const businessUseCase = new RegisterBusinessUseCase(businessRepository,usersRepository );
        const removeBusinessUseCase = new RemoveBusinessUseCase(businessRepository);

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

        const removedBusiness = await removeBusinessUseCase.execute(business.id);

        expect(removedBusiness).toBeUndefined();

    })

    it('should not be able to remove', async () => {

        const businessRepository = new InMemoryBusinessRepository();
        const removeBusinessUseCase = new RemoveBusinessUseCase(businessRepository);

        await expect(()=> {
            return  removeBusinessUseCase.execute(
                'asdasda',
            )
        }).rejects.toBeInstanceOf(BusinessNotFoundError);
    })
})
