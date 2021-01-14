import { Injectable } from "@nestjs/common";
import * as FastifySecureSession from "fastify-secure-session";
import { UserService } from "../user/user.service";

@Injectable()
export class AdminService {
  readonly SESSION_USER_ID = "user_id";

  constructor(private readonly userService: UserService) {}

  async isAuthorized(session: FastifySecureSession.Session) {
    const maybeUserId = session.get(this.SESSION_USER_ID);
    return maybeUserId && (await this.userService.findById(maybeUserId));
  }
}
