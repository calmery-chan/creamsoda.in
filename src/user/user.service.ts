import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async authenticate(name: string, password: string): Promise<User | null> {
    const user = await this.findByName(name);

    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }

    return null;
  }

  findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findByName(name: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { name } });
  }
}
