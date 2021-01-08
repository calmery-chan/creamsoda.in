import { Injectable } from "@nestjs/common";
import { ChekiEditedImage, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CloudinaryService } from "../cloudinary/cloudinary.service";

@Injectable()
export class ChekiService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly prismaService: PrismaService
  ) {}

  async find({
    id,
  }: Required<
    Pick<Prisma.ChekiEditedImageWhereUniqueInput, "id">
  >): Promise<ChekiEditedImage | null> {
    return this.prismaService.chekiEditedImage.findUnique({
      where: { id },
    });
  }

  getImageUrl(id: string) {
    return this.cloudinaryService.getUrl(
      `noneme-chan-cheki/edited-images/${id}`
    );
  }

  getOgImageUrl(id: string) {
    return this.cloudinaryService.getUrl(
      `noneme-chan-cheki/edited-images/${id}`,
      {
        background: "#FFF",
        crop: "pad",
        height: 630,
        width: 1200,
      }
    );
  }
}
