import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  Session,
} from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";
import * as FastifySecureSession from "fastify-secure-session";
import { UserService } from "../user/user.service";
import { resolveControllerPrefix } from "../utils/controller";
import { send } from "../utils/discord";
import { verifyRecaptcha } from "../utils/recaptcha";

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
    @Req() request: FastifyRequest,
    @Res() response: FastifyReply,
    @Session() session: FastifySecureSession.Session
  ) {
    const name: string | undefined = request.body["name"];
    const password: string | undefined = request.body["password"];
    const recaptcha: string | undefined = request.body["recaptcha"];

    if (!name || !password || !recaptcha) {
      return response.status(HttpStatus.BAD_REQUEST).send();
    }

    if (!(await verifyRecaptcha(recaptcha))) {
      return response.status(HttpStatus.FORBIDDEN).send();
    }

    const user = await this.userService.authenticate(name, password);

    if (!user) {
      await send({
        color: 16711680,
        description: `An attempt was made to log in (${name})`,
        title: "Failed to login",
      });

      return response.status(HttpStatus.UNAUTHORIZED).send();
    }

    await send({
      description: `Logged in as ${name}`,
      title: "Succeeded to login",
    });

    session.set(SESSION_USER_ID, user.id);

    return response.status(HttpStatus.OK).send();
  }
}
