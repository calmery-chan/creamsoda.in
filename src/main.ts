import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { cors, session } from "./utils/middlewares";
import "./utils/sentry";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  cors(app);
  session(app);

  console.log(process.env);

  await app.listen(process.env.PORT || 5000);
}

bootstrap();
