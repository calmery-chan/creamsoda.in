import { Injectable } from "@nestjs/common";
import {
  ImageTransformationOptions,
  UploadApiOptions,
  v2 as cloudinary,
} from "cloudinary";

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    });
  }

  getUrl(publicId: string, options?: ImageTransformationOptions) {
    return cloudinary.url(publicId, {
      secure: true,
      ...options,
    });
  }

  upload(
    steam: NodeJS.ReadableStream,
    options?: UploadApiOptions
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      steam.pipe(
        cloudinary.uploader.upload_stream(options || {}, (error, result) => {
          if (result) {
            resolve();
          } else {
            reject(error);
          }
        })
      );
    });
  }
}
