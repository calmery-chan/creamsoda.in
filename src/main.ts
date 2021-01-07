import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import fastifyCors from "fastify-cors";
import fastifySecureSession from "fastify-secure-session";
import { AppModule } from "./app.module";
import "./utils/sentry";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.register(fastifyCors, {
    origin: [
      "http://localhost:3000",
      "https://metaneno.art",
      "https://metaneno-art.calmery-chan.vercel.app",
      /https:\/\/metaneno-art-[\d|\w]+\.vercel\.app$/,
    ],
  });

  app.register(fastifySecureSession, {
    secret: process.env.SESSION_SECRET,
    salt: process.env.SESSION_SALT,
  });

  await app.listen(process.env.PORT || 5000);
}

bootstrap();
