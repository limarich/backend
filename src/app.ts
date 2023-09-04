import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyCors from "@fastify/cors";

export const app = fastify();

app.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
});

app.register(appRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return reply.status(500).send({ message: "Internal Server Error" });
});
