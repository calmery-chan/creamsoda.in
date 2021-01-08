import { Controller, Get, HttpStatus, Param, Res } from "@nestjs/common";
import { FastifyReply } from "fastify";
import { resolveControllerPrefix } from "src/utils/controller";
import { ChekiService } from "./cheki.service";

@Controller(resolveControllerPrefix("cheki"))
export class ChekiController {
  constructor(private readonly chekiService: ChekiService) {}

  @Get("/edited_images/:id")
  async getChekiEditedImage(
    @Param("id") id: string,
    @Res() response: FastifyReply
  ) {
    if (!(await this.chekiService.find({ id }))) {
      return response.status(HttpStatus.NOT_FOUND).send();
    }

    return response.status(HttpStatus.OK).send({
      data: {
        image_url: this.chekiService.getImageUrl(id),
        og_image_url: this.chekiService.getOgImageUrl(id),
      },
    });
  }
}
