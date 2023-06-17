import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { update } from "./controllers/update";
import { authenticate } from "./controllers/authenticate";

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', register);
    app.post('/sections', authenticate);
    app.put('/user/update', update);
}