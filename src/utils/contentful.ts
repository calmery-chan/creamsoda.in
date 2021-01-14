import { createClient } from "contentful-management";
import { Link } from "contentful-management/dist/typings/common-types";
import { Entry } from "contentful-management/dist/typings/entities/entry";
import { CONTENT_TYPES, LOCALES } from "../constants/contentful";
import {
  ContentfulAssetId,
  ContentfulEntryId,
  ContentfulFieldWithLocale,
  ContentfulLocale,
  Environment,
} from "../types/Contentful";
import { Sentry } from "./sentry";

const contentful = createClient({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  accessToken: process.env.CONTENTFUL_PERSONAL_ACCESS_TOKEN!,
});

// Types

// Helper Functions

const applyToMultipleLocales = <T extends unknown>(
  handler: T | ((locale: ContentfulLocale) => T)
): ContentfulFieldWithLocale<T> =>
  LOCALES.reduce<Partial<ContentfulFieldWithLocale<T>>>(
    (locales, locale) => ({
      ...locales,
      [locale]: handler instanceof Function ? handler(locale) : handler,
    }),
    {}
  ) as ContentfulFieldWithLocale<T>;

const createEntry = async (
  contentType: typeof CONTENT_TYPES[number],
  fields: {
    [key: string]: {
      [key in typeof LOCALES[number]]: Link<"Asset"> | string | number;
    };
  }
) => {
  const environment = await getEnvironment();
  return environment.createEntry(contentType, { fields });
};

const getEnvironment = async (environment?: string): Promise<Environment> => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const space = await contentful.getSpace(process.env.CONTENTFUL_SPACE!);

  return space.getEnvironment(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    environment || process.env.CONTENTFUL_ENVIRONMENT!
  );
};

// Main

export const createAsset = async (
  file: {
    file: NodeJS.ReadableStream;
    filename: string;
    mimetype: string;
  }, // `Multipart`
  options?: {
    [key in typeof LOCALES[number]]?: {
      description?: string;
      title?: string;
    };
  }
): Promise<ContentfulAssetId | null> => {
  try {
    let asset = await (await getEnvironment()).createAssetFromFiles({
      fields: {
        description: applyToMultipleLocales<string>(
          (locale) => options?.[locale]?.description || ""
        ),
        file: applyToMultipleLocales(() => ({
          contentType: file.mimetype,
          fileName: file.filename,
          file: file.file,
        })),
        title: applyToMultipleLocales<string>(
          (locale) => options?.[locale]?.title || file.filename
        ),
      },
    });

    asset = await asset.processForAllLocales();
    asset = await asset.publish();

    return asset.sys.id as ContentfulAssetId;
  } catch (error) {
    Sentry.captureException(error);

    return null;
  }
};

export const create3dModel = async ({
  assetId,
  name,
}: {
  assetId: ContentfulAssetId;
  name: string;
}): Promise<ContentfulEntryId | null> => {
  let entry: Entry;

  try {
    entry = await createEntry("3d-models", {
      file: applyToMultipleLocales<Link<"Asset">>({
        sys: {
          id: assetId,
          linkType: "Asset",
          type: "Link",
        },
      }),
      name: applyToMultipleLocales(name),
      positionX: applyToMultipleLocales(0),
      positionY: applyToMultipleLocales(0),
      positionZ: applyToMultipleLocales(0),
      rotateX: applyToMultipleLocales(0),
      rotateY: applyToMultipleLocales(0),
      rotateZ: applyToMultipleLocales(0),
      scaleX: applyToMultipleLocales(1),
      scaleY: applyToMultipleLocales(1),
      scaleZ: applyToMultipleLocales(1),
    });

    entry = await entry.publish();

    return entry.sys.id as ContentfulEntryId;
  } catch (error) {
    Sentry.captureException(error);

    return null;
  }
};

export const update3dModel = async (
  entryId: ContentfulEntryId,
  fields: Partial<{
    positionX: number;
    positionY: number;
    positionZ: number;
    rotateX: number;
    rotateY: number;
    rotateZ: number;
    scaleX: number;
    scaleY: number;
    scaleZ: number;
  }>
): Promise<boolean> => {
  try {
    const environment = await getEnvironment();
    let entry = await environment.getEntry(entryId);

    if (entry.sys.contentType.sys.id !== "3d-models") {
      return false;
    }

    Object.keys(fields).forEach((_key) => {
      const key = _key as keyof typeof fields;

      if (fields[key]) {
        entry.fields[key] = applyToMultipleLocales(fields[key]);
      }
    });

    entry = await entry.update();
    await entry.publish();

    return true;
  } catch (error) {
    // Sentry.captureException(error);
    console.log(error);

    return false;
  }
};
