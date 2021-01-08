import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { resolveControllerPrefix } from "./utils/controller";

@Controller(resolveControllerPrefix())
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
