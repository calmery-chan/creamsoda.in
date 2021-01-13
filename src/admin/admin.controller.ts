import {
  Body,
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
import * as requestIp from "request-ip";
import { UserService } from "../user/user.service";
import { create3dModel, createAsset } from "../utils/contentful";
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
    @Body()
    {
      name,
      password,
      recaptcha,
    }: {
      name?: string;
      password?: string;
      recaptcha?: string;
    },
    @Req() request: FastifyRequest,
    @Res() response: FastifyReply,
    @Session() session: FastifySecureSession.Session
  ) {
    const ip = requestIp.getClientIp(request);

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
        description: `An attempt was made to log in (${name}) (${ip})`,
        title: "Failed to login",
      });

      return response.status(HttpStatus.UNAUTHORIZED).send();
    }

    await send({
      description: `Logged in (${name}) (${ip})`,
      title: "Succeeded to login",
    });

    session.set(SESSION_USER_ID, user.id);

    return response.status(HttpStatus.OK).send();
  }

  // Contentful

  @Post("/entries/3d-models")
  async postWorks(
    @Req() request: FastifyRequest,
    @Res() response: FastifyReply
  ) {
    const file = await request.file();

    if (!file) {
      return response.status(HttpStatus.BAD_REQUEST).send();
    }

    const assetId = await createAsset(file);

    if (!assetId) {
      return response.status(HttpStatus.SERVICE_UNAVAILABLE).send();
    }

    let name: string | string[];

    name = [].slice.call(file.filename.split(".")[0]);
    name[0] = name[0].toUpperCase();
    name = name.join("");

    const entryId = await create3dModel({
      assetId,
      name,
    });

    if (!entryId) {
      return response.status(HttpStatus.SERVICE_UNAVAILABLE).send();
    }

    return response.status(HttpStatus.OK).send({ data: { id: entryId } });
  }
}
