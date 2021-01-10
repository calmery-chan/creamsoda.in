import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  Session,
} from "@nestjs/common";
import { FastifyReply } from "fastify";
import * as FastifySecureSession from "fastify-secure-session";
import { UserService } from "../user/user.service";
import { resolveControllerPrefix } from "../utils/controller";

const SESSION_USER_ID = "user_id";

@Controller(resolveControllerPrefix("admin"))
export class AdminController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async get(
    @Res() response: FastifyReply,
    @Session() session: FastifySecureSession.Session
  ) {
    const maybeUserId = session.get(SESSION_USER_ID);

    if (!maybeUserId || !this.userService.findById(maybeUserId)) {
      return response.status(HttpStatus.UNAUTHORIZED).send();
    }

    return response.status(HttpStatus.OK).send();
  }

  @Post()
  async post(
    @Body("name") name: string,
    @Body("password") password: string,
    @Res() response: FastifyReply,
    @Session() session: FastifySecureSession.Session
  ) {
    const user = await this.userService.authenticate(name, password);

    if (!user) {
      return response.status(HttpStatus.UNAUTHORIZED).send();
    }

    session.set(SESSION_USER_ID, user.id);

    return response.status(HttpStatus.OK).send();
  }
}
