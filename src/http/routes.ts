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

export async function appRoutes(app: FastifyInstance) {
  // user routes
  app.post("/users", registerUser);
  app.get("/user", getUser);
  app.put("/user/update", update);
  app.post("/sections", authenticate);
  // business routes
  app.post("/business", RegisterBusiness);
  app.get("/business", getBusiness);
  app.put("/business", updateBusiness);
  app.delete("/business", removeBusiness);
  // swot routes
  app.post("/swot", RegisterSwot);
  app.get("/swot", getSwot);
  app.put("/swot", updateSwot);
  // business model routes
  app.post("/business-model", RegisterBusinessModel);
  app.get("/business/business-model", getBusinessModelByBusinessId);
  app.get("/business-model", getBusinessModel);
}
