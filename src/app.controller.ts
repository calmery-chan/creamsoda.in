import { Controller, Get, Req } from "@nestjs/common";
import { AppService } from "./app.service";
import { FastifyRequest } from "fastify";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() request: FastifyRequest): string {
    const visits = (request.session.get("visits") || 0) + 1;
    request.session.set("visits", visits);

    return this.appService.getHello() + " " + visits;
  }
}
