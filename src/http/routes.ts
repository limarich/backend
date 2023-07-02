import { FastifyInstance } from "fastify";
import { registerUser } from "./controllers/registerUser";
import { update } from "./controllers/update";
import { authenticate } from "./controllers/authenticate";
import { getUser } from "./controllers/getUser";
import { RegisterBusiness } from "./controllers/registerBusiness";
import { RegisterSwot } from "./controllers/registerSwot";
import { RegisterBusinessModel } from "./controllers/registerBusinessModel";
import { getBusiness } from "./controllers/getBusiness";
import { updateBusiness } from "./controllers/updateBusiness";

export async function appRoutes(app: FastifyInstance) {
    // user routes
    app.post('/users', registerUser);
    app.post('/sections', authenticate);
    app.put('/user/update', update);
    app.get('/user', getUser);
    // business routes
    app.post('/business', RegisterBusiness);
    app.get('/business', getBusiness);
    app.put('/business',updateBusiness);
    // swot routes
    app.post('/swot',RegisterSwot);
    // business model routes
    app.post('/business-model',RegisterBusinessModel);
}