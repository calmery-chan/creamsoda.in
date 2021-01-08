import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";
import { resolveControllerPrefix } from "src/utils/controller";
import { ChekiService } from "./cheki.service";

@Controller(resolveControllerPrefix("cheki"))
export class ChekiController {
  constructor(private readonly chekiService: ChekiService) {}

  @Get("/images/:id")
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

  @Post("/images")
  async postChekiEditedImage(
    @Req() request: FastifyRequest,
    @Res() response: FastifyReply
  ) {
    const { fieldname, file, mimetype } = await request.file();

    if (fieldname !== "image" || mimetype !== "image/png") {
      return response.status(HttpStatus.BAD_REQUEST).send();
    }

    const id = await this.chekiService.create(file);

    if (!id) {
      return response.status(HttpStatus.SERVICE_UNAVAILABLE).send();
    }

    response.status(HttpStatus.OK).send({
      data: { id },
    });
  }
}
