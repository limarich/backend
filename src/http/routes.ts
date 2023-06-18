import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { update } from "./controllers/update";
import { authenticate } from "./controllers/authenticate";
import { getUser } from "./controllers/getUser";
import { RegisterBusiness } from "./controllers/registerBusiness";

export async function appRoutes(app: FastifyInstance) {
    // user routes
    app.post('/users', register);
    app.post('/sections', authenticate);
    app.put('/user/update', update);
    app.get('/user', getUser);
    // business routes
    app.post('/business', RegisterBusiness);
}