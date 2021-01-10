import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserService } from "../user/user.service";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";

@Module({
  imports: [],
  controllers: [AdminController],
  providers: [AdminService, PrismaService, UserService],
})
export class AdminModule {}
