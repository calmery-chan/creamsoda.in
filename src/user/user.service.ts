import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../prisma/prisma.service";
import { Sentry } from "../utils/sentry";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async authenticate(name: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { name } });

    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }

    return null;
  }

  async create(
    data: Pick<Prisma.UserCreateInput, "name" | "password">
  ): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...data,
        password: bcrypt.hashSync(data.password, 16),
      },
    });
  }

  async update({
    data,
    where,
  }: {
    data: Pick<Prisma.UserUpdateInput, "name" | "password" | "role">;
    where: Required<Pick<Prisma.UserWhereUniqueInput, "id">>;
  }): Promise<User | null> {
    try {
      return await this.prisma.user.update({
        data,
        where,
      });
    } catch (error) {
      Sentry.captureException(error);

      return null;
    }
  }
}
