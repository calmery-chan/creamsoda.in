import { NestFastifyApplication } from "@nestjs/platform-fastify";
import fastifyCors from "fastify-cors";
import fastifySecureSession from "fastify-secure-session";

export const cors = (app: NestFastifyApplication) =>
  app.register(fastifyCors, {
    credentials: true,
    maxAge: 1800, // 30 minutes
    methods: ["GET", "POST", "PUT"],
    origin: [
      "http://localhost:3000",
      "https://metaneno.art",
      "https://metaneno-art.calmery-chan.vercel.app",
      /https:\/\/metaneno-art-[\d|\w]+\.vercel\.app$/,
    ],
  });

export const session = (app: NestFastifyApplication) =>
  app.register(fastifySecureSession, {
    secret: process.env.SESSION_SECRET,
    salt: process.env.SESSION_SALT,
  });
