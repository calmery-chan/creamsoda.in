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
import { Multipart } from "fastify-multipart";
import * as FastifySecureSession from "fastify-secure-session";
import * as requestIp from "request-ip";
import { ContentfulAreaId, ContentfulEntryId } from "../types/Contentful";
import { UserService } from "../user/user.service";
import {
  createObject,
  createAsset,
  deleteObject,
  updateObject,
  getAreas,
  getObjects,
  getAreaSlugs,
} from "../utils/contentful";
import { resolveControllerPrefix } from "../utils/controller";
import { send } from "../utils/discord";
import { verifyRecaptcha } from "../utils/recaptcha";
import { AdminService } from "./admin.service";

const SESSION_USER_ID = "user_id";

@Controller(resolveControllerPrefix("admin"))
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UserService
  ) {}

  @Get()
  async get(
    @Res() response: FastifyReply,
    @Session() session: FastifySecureSession.Session
  ) {
    if (!(await this.adminService.isAuthorized(session))) {
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
    if (await this.adminService.isAuthorized(session)) {
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

  // Areas

  @Get("/entries/areas")
  async getAreas(
    @Res() response: FastifyReply,
    @Session() session: FastifySecureSession.Session
  ) {
    if (!(await this.adminService.isAuthorized(session))) {
      return response.status(HttpStatus.FORBIDDEN).send();
    }

    return response.status(HttpStatus.OK).send({ data: await getAreas() });
  }

  // Objects

  @Delete("/entries/objects/:id")
  async deleteObject(
    @Param("id") id: ContentfulEntryId,
    @Res() response: FastifyReply,
    @Session() session: FastifySecureSession.Session
  ) {
    if (!(await this.adminService.isAuthorized(session))) {
      return response.status(HttpStatus.FORBIDDEN).send();
    }

    if (!(await deleteObject(id))) {
      return response.status(HttpStatus.NOT_FOUND).send();
    }

    return response.status(HttpStatus.OK).send();
  }

  @Get("/entries/objects")
  async getObjects(
    @Res() response: FastifyReply,
    @Session() session: FastifySecureSession.Session
  ) {
    if (!(await this.adminService.isAuthorized(session))) {
      return response.status(HttpStatus.FORBIDDEN).send();
    }

    const areas = await getAreaSlugs();

    return response.status(HttpStatus.OK).send({
      data: (await Promise.all(areas.map(getObjects)))
        .map((objects, index) => ({ [areas[index]]: objects }))
        .reduce((xs, ys) => ({ ...xs, ...ys }), {}),
    });
  }

  @Post("/entries/objects")
  async postObject(
    @Req() request: FastifyRequest,
    @Res() response: FastifyReply,
    @Session() session: FastifySecureSession.Session
  ) {
    if (!(await this.adminService.isAuthorized(session))) {
      return response.status(HttpStatus.FORBIDDEN).send();
    }

    const file = await request.file();
    const area = (file.fields.area as unknown) as Multipart<string> | undefined;

    if (!area || !file || file.mimetype !== "model/gltf+json") {
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

    const entryId = await createObject({
      areaId: area.value as ContentfulAreaId,
      assetId,
      name,
    });

    if (!entryId) {
      return response.status(HttpStatus.SERVICE_UNAVAILABLE).send();
    }

    return response.status(HttpStatus.OK).send({ data: { id: entryId } });
  }

  @Put("/entries/object/:id")
  async putObject(
    @Body() body: string,
    @Param("id") id: ContentfulEntryId,
    @Res() response: FastifyReply,
    @Session() session: FastifySecureSession.Session
  ) {
    if (!(await this.adminService.isAuthorized(session))) {
      return response.status(HttpStatus.FORBIDDEN).send();
    }

    if (await updateObject(id, JSON.parse(body))) {
      return response.status(HttpStatus.OK).send();
    }

    return response.status(HttpStatus.SERVICE_UNAVAILABLE).send();
  }
}
