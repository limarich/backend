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
import { removeBusiness } from "./controllers/removeBusiness";
import { updateSwot } from "./controllers/updateSwot";
import { getSwot } from "./controllers/getSwot";
import { getBusinessModelByBusinessId } from "./controllers/getBusinessModelByBusinessId";
import { getBusinessModel } from "./controllers/getBusinessModel";
import { updateBusinessModel } from "./controllers/updateBusinessModel";
import { RegisterActionPlan } from "./controllers/registerActionPlan";
import { getActionPlan } from "./controllers/getActionPlan";
import { checkToken } from "./middlewares/checkToken";

export async function appRoutes(app: FastifyInstance) {
  app.post("/sections", authenticate);

  // user routes
  app.post(
    "/users",
    // , { preHandler: [checkToken] }
    registerUser
  );
  app.get("/user", { preHandler: [checkToken] }, getUser);
  app.put("/user/update", { preHandler: [checkToken] }, update);
  // business routes
  app.post("/business", { preHandler: [checkToken] }, RegisterBusiness);
  app.get("/business", { preHandler: [checkToken] }, getBusiness);
  app.put("/business", { preHandler: [checkToken] }, updateBusiness);
  app.delete("/business", { preHandler: [checkToken] }, removeBusiness);
  // swot routes
  app.post("/swot", { preHandler: [checkToken] }, RegisterSwot);
  app.get("/swot", { preHandler: [checkToken] }, getSwot);
  app.put("/swot", { preHandler: [checkToken] }, updateSwot);
  // business model routes
  app.post(
    "/business-model",
    { preHandler: [checkToken] },
    RegisterBusinessModel
  );
  app.get(
    "/business/business-model",
    { preHandler: [checkToken] },
    getBusinessModelByBusinessId
  );
  app.get("/business-model", { preHandler: [checkToken] }, getBusinessModel);
  app.put("/business-model", { preHandler: [checkToken] }, updateBusinessModel);
  // action plan routes
  app.post("/action-plan", { preHandler: [checkToken] }, RegisterActionPlan);
  app.get("/action-plan", { preHandler: [checkToken] }, getActionPlan);
}
