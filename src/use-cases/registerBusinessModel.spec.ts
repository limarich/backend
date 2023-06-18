
import { describe, it, expect} from 'vitest';
import { InMemoryBusinessRepository } from '../repositories/in-memory/in-memory-business-repository';
import { RegisterBusinessUseCase } from './registerBusiness';
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository';
import { RegisterUseCase } from './register';
import { BusinessNotFoundError } from './errors/business-not-found-error';
import { InMemoryBusinessModelRepository } from '../repositories/in-memory/in-memory-business-model-repository';
import { RegisterBusinessModelUseCase } from './registerBusinessModel';


describe('Register Business Model Swot use case', () => {

    it('should be able to register', async () => {

        const businessRepository = new InMemoryBusinessRepository();
        const usersRepository = new InMemoryUsersRepository();
        const businessModelRepository = new InMemoryBusinessModelRepository();

        const registerUseCase = new RegisterUseCase(usersRepository);
        const businessUseCase = new RegisterBusinessUseCase(businessRepository,usersRepository );
        const registerBusinessModelUseCase = new RegisterBusinessModelUseCase(businessRepository, businessModelRepository);

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

        const { businessModel } = await registerBusinessModelUseCase.execute({
            businessId: business.id,
            mainPartnerships: ["teste"],
	        mainActivities: ["teste"],
	        mainResources: ["teste"],
	        valueProposition: [],
	        customerRelationship: [],
	        channels: ["teste"],
	        customerSegments: ["teste"],
	        costs: [],
	        revenue: ["teste"],
        })

        expect(businessModel.id).toEqual(expect.any(String));
    })

    it('should not be able to register', async () => {

        const businessRepository = new InMemoryBusinessRepository();
        const businessModelRepository = new InMemoryBusinessModelRepository();

        const registerBusinessModelUseCase = new RegisterBusinessModelUseCase(businessRepository, businessModelRepository);


        try {
            await registerBusinessModelUseCase.execute({
                businessId: "asdasd",
                mainPartnerships: ["teste"],
                mainActivities: ["teste"],
                mainResources: ["teste"],
                valueProposition: [],
                customerRelationship: [],
                channels: ["teste"],
                customerSegments: ["teste"],
                costs: [],
                revenue: ["teste"],
            });
          } catch (error) { 
            expect(error).toBeInstanceOf(BusinessNotFoundError);
          }
    })
})
