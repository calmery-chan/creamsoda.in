import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AdminModule } from "./admin/admin.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ChekiModule } from "./cheki/cheki.module";
import { MultiplayGateway } from "./multiplay.gateway";
import { MultiplayService } from "./multiplay/multiplay.service";
import { PrismaService } from "./prisma/prisma.service";

@Module({
  imports: [ConfigModule.forRoot(), AdminModule, ChekiModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, MultiplayGateway, MultiplayService],
})
export class AppModule {}
