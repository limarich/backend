
import { describe, it, expect} from 'vitest';
import { RegisterUseCase } from './register';
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository';
import { InMemoryBusinessRepository } from '../repositories/in-memory/in-memory-business-repository';
import { RegisterBusinessUseCase } from './registerBusiness';
import { GetBusinessUseCase } from './getBusiness';
import { BusinessNotFoundError } from './errors/business-not-found-error';


describe('Get business data use case', () => {

    it('should be able to get Data', async () => {

        const businessRepository = new InMemoryBusinessRepository();
        const usersRepository = new InMemoryUsersRepository();

        const registerUseCase = new RegisterUseCase(usersRepository);
        const businessUseCase = new RegisterBusinessUseCase(businessRepository,usersRepository );
        const getBusinessUseCase = new GetBusinessUseCase(businessRepository); 

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

        console.log('negocio', business.id)

        const getBusinessResponse = await getBusinessUseCase.execute(business.id);

        expect(getBusinessResponse.business.id).toEqual(expect.any(String));
    })

    it('should be not able to get Data', async () => {
        const businessRepository = new InMemoryBusinessRepository();
        const getBusinessUseCase = new GetBusinessUseCase(businessRepository);

        await expect(()=> {
            return getBusinessUseCase.execute("asdasda");
        }).rejects.toBeInstanceOf(BusinessNotFoundError);
    })


})
