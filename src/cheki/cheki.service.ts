import { Injectable } from "@nestjs/common";
import { CloudinaryService } from "../cloudinary/cloudinary.service";

@Injectable()
export class ChekiService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  getImageUrl(id: string) {
    return this.cloudinaryService.getUrl(`cheki/edited_images/${id}`);
  }

  getOgImageUrl(id: string) {
    return this.cloudinaryService.getUrl(`cheki/edited_images/${id}`, {
      background: "#FFF",
      crop: "pad",
      height: 630,
      width: 1200,
    });
  }
}
