import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { env } from "process";

export const checkToken = (
  req: FastifyRequest,
  reply: FastifyReply,
  done: () => void
) => {
  const reqHeader = req.headers["authorization"];

  const token = reqHeader && reqHeader.split(" ")[1];

  if (!token) {
    return reply.code(400).send({ message: "Acesso negado" });
  }
  try {
    const secret = env.SECRET || "";
    jwt.verify(token, secret);
    done();
  } catch (err) {
    return reply.code(400).send({ message: "Token inválido" });
  }
};
