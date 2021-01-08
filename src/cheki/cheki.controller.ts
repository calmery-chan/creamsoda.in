import { Controller, Get, Param } from "@nestjs/common";
import { resolveControllerPrefix } from "src/utils/controller";
import { ChekiService } from "./cheki.service";

@Controller(resolveControllerPrefix("cheki"))
export class ChekiController {
  constructor(private readonly chekiService: ChekiService) {}

  @Get("/edited_images/:id")
  getChekiEditedImage(@Param("id") id: string) {
    return {
      data: {
        image_url: this.chekiService.getImageUrl(id),
        og_image_url: this.chekiService.getOgImageUrl(id),
      },
    };
  }
}
