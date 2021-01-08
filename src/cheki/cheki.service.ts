import { Injectable } from "@nestjs/common";
import { ChekiEditedImage, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { getCloudinaryPublicId } from "../utils/cheki";
import { Sentry } from "../utils/sentry";

@Injectable()
export class ChekiService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly prismaService: PrismaService
  ) {}

  async create(file: NodeJS.ReadableStream): Promise<string | null> {
    const { id } = await this.prismaService.chekiEditedImage.create({
      data: {},
    });

    try {
      await this.cloudinaryService.upload(file, {
        public_id: getCloudinaryPublicId(id),
      });

      return id;
    } catch (error) {
      Sentry.captureException(error);

      await this.delete({ id });

      return null;
    }
  }

  async delete({
    id,
  }: Required<
    Pick<Prisma.ChekiEditedImageWhereUniqueInput, "id">
  >): Promise<boolean> {
    try {
      await this.prismaService.chekiEditedImage.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      Sentry.captureException(error);

      return false;
    }
  }

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
