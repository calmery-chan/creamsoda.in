import { Module } from "@nestjs/common";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { PrismaService } from "src/prisma.service";
import { ChekiController } from "./cheki.controller";
import { ChekiService } from "./cheki.service";

@Module({
  imports: [],
  controllers: [ChekiController],
  providers: [ChekiService, CloudinaryService, PrismaService],
})
export class ChekiModule {}
