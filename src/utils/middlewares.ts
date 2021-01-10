import { NestFastifyApplication } from "@nestjs/platform-fastify";
import fastifyCors from "fastify-cors";
import fastifyMultipart from "fastify-multipart";
import fastifySecureSession, {
  SecureSessionPluginOptions,
} from "fastify-secure-session";

export const cors = (app: NestFastifyApplication) =>
  app.register(fastifyCors, {
    credentials: true,
    maxAge: 1800, // 30 minutes
    methods: ["GET", "POST", "PUT"],
    origin: [
      "http://localhost:3000",
      "https://metaneno.art",
      // "https://metaneno-art.calmery-chan.vercel.app",
      // /https:\/\/metaneno-art-[\d|\w]+\.vercel\.app$/,
    ],
  });

export const multipart = (app: NestFastifyApplication) =>
  app.register(fastifyMultipart);

export const session = (app: NestFastifyApplication) => {
  const cookie: SecureSessionPluginOptions["cookie"] =
    process.env.NODE_ENV === "production"
      ? { sameSite: "none", secure: true }
      : {};

  app.register(fastifySecureSession, {
    secret: process.env.SESSION_SECRET,
    salt: process.env.SESSION_SALT,
    cookie: {
      ...cookie,
      httpOnly: true,
      maxAge: 1800,
      path: "/",
      // signed: true
    },
    cookieName: "_session",
  });
};
