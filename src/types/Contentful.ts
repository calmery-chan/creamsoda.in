import { LOCALES } from "../constants/contentful";
import { PhantomType } from "./PhantomType";

export * from "contentful-management/dist/typings/entities/asset";
export * from "contentful-management/dist/typings/entities/environment";

export type ContentfulAreaId = PhantomType<string, "ContentfulAreaId">;

export type ContentfulAssetId = PhantomType<string, "ContentfulAssetId">;

export type ContentfulEntryId = PhantomType<string, "ContentfulEntryId">;

export type ContentfulFieldWithLocale<T extends unknown> = {
  [key in ContentfulLocale]: T;
};

export type ContentfulLocale = typeof LOCALES[number];
