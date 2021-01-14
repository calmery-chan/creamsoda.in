import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  Session,
} from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";
import * as FastifySecureSession from "fastify-secure-session";
import * as requestIp from "request-ip";
import { ContentfulEntryId } from "../types/Contentful";
import { UserService } from "../user/user.service";
import {
  create3dModel,
  createAsset,
  delete3dModel,
  update3dModel,
} from "../utils/contentful";
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
    if (!this.isAuthorized(session)) {
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
    if (this.isAuthorized(session)) {
      return response.status(HttpStatus.CONFLICT).send();
    }

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

  @Delete("/entries/3d-models/:id")
  async delete3dModels(
    @Param("id") id: ContentfulEntryId,
    @Res() response: FastifyReply,
    @Session() session: FastifySecureSession.Session
  ) {
    if (!this.isAuthorized(session)) {
      return response.status(HttpStatus.FORBIDDEN).send();
    }

    if (await delete3dModel(id)) {
      return response.status(HttpStatus.OK).send();
    }

    return response.status(HttpStatus.SERVICE_UNAVAILABLE).send();
  }

  @Post("/entries/3d-models")
  async post3dModels(
    @Req() request: FastifyRequest,
    @Res() response: FastifyReply,
    @Session() session: FastifySecureSession.Session
  ) {
    if (!this.isAuthorized(session)) {
      return response.status(HttpStatus.FORBIDDEN).send();
    }

    const file = await request.file();

    if (!file || file.mimetype !== "model/gltf+json") {
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

  @Put("/entries/3d-models/:id")
  async put3dModels(
    @Body() body: string,
    @Param("id") id: ContentfulEntryId,
    @Res() response: FastifyReply,
    @Session() session: FastifySecureSession.Session
  ) {
    if (!this.isAuthorized(session)) {
      return response.status(HttpStatus.FORBIDDEN).send();
    }

    // ToDo: 認証済みのユーザからのリクエストのみ受け取ってはいるが、値のチェックをする
    if (await update3dModel(id, JSON.parse(body))) {
      return response.status(HttpStatus.OK).send();
    }

    return response.status(HttpStatus.SERVICE_UNAVAILABLE).send();
  }

  // Private

  private isAuthorized(session: FastifySecureSession.Session) {
    const maybeUserId = session.get(SESSION_USER_ID);
    return maybeUserId && this.userService.findById(maybeUserId);
  }
}
