import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  NotFoundException,
} from "@nestjs/common";
import { FastifyReply } from "fastify";
import { Sentry } from "./utils/sentry";

@Catch()
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    Sentry.captureException(exception);

    const context = host.switchToHttp();
    const response = context.getResponse<FastifyReply>();

    response.status(HttpStatus.NOT_FOUND).send();
  }
}
