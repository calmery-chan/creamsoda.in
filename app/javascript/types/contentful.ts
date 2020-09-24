import { Document } from "@contentful/rich-text-types";

export type ContentfulResponse<T> = {
  data: T;
};

export type Work = {
  title: string;
  description: Document;
  thumbnails: {
    url: string;
    width: number;
    height: number;
  }[];
  model: {
    url: string;
    file_size: number;
    content_type: string;
    position_x: number;
    position_y: number;
    position_z: number;
    rotate_x: number;
    rotate_y: number;
    rotate_z: number;
    scale_x: number;
    scale_y: number;
    scale_z: number;
  };
};

export type Works = Work[];

export type WorksResponse = ContentfulResponse<{ works: Works }>;
