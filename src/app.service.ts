import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  empty(): string {
    return "";
  }
}
