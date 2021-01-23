import { Document } from "@contentful/rich-text-types";
import axios from "axios";
import { createClient } from "contentful-management";
import { Link } from "contentful-management/dist/typings/common-types";
import { LOCALES } from "../constants/contentful";
import {
  ContentfulAreaId,
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
  contentType: string,
  fields: {
    [key: string]: {
      [key in typeof LOCALES[number]]: Link<string> | number | string;
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

const graphql = async <T extends unknown>(
  query: string
): Promise<{
  data: T;
}> => {
  const { data } = await axios.post(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE}/environments/${process.env.CONTENTFUL_ENVIRONMENT}`,
    {
      query,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_CONTENT_PREVIEW_API_ACCESS_TOKEN}`,
      },
    }
  );

  return data;
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

// Areas

export const getAreas = async () => {
  const { data } = await graphql<{
    areasCollection: {
      items: {
        description: Document;
        slug: string;
        thumbnailsCollection: {
          items: {
            height: number;
            size: number;
            url: string;
            width: number;
          }[];
        };
        title: string;
      }[];
    };
  }>(`
    {
      areasCollection(preview: true) {
        items {
          description {
            json
          }
          slug
          thumbnailsCollection {
            items {
              height
              size
              url
              width
            }
          }
          title
        }
      }
    }
  `);

  return data.areasCollection.items.map(
    ({ description, slug, thumbnailsCollection, title }) => ({
      description,
      slug,
      thumbnails: thumbnailsCollection.items,
      title,
    })
  );
};

// Objects

// `area` に関しては Contentful 側で Entry の制限をしている、対象となる Asset や Entry が存在しないときはエラーとなるので `areaId`、`assetId` が正しいことを確認する必要はない
export const createObject = async ({
  areaId,
  assetId,
  name,
}: {
  areaId: ContentfulAreaId;
  assetId: ContentfulAssetId;
  name: string;
}): Promise<ContentfulEntryId | null> => {
  try {
    const entry = await createEntry("objects", {
      area: applyToMultipleLocales<Link<"Entry">>({
        sys: {
          id: areaId,
          linkType: "Entry",
          type: "Link",
        },
      }),
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

    return entry.sys.id as ContentfulEntryId;
  } catch (error) {
    Sentry.captureException(error);

    return null;
  }
};

export const deleteObject = async (entryId: ContentfulEntryId) => {
  try {
    const environment = await getEnvironment();
    const entry = await environment.getEntry(entryId);

    if (entry.sys.contentType.sys.id !== "objects") {
      return false;
    }

    await entry.archive();

    return true;
  } catch (error) {
    Sentry.captureException(error);

    return false;
  }
};

export const updateObject = async (
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
    const entry = await environment.getEntry(entryId);

    if (entry.sys.contentType.sys.id !== "objects") {
      return false;
    }

    // ToDo: `area` や `file` も書き換え可能のため対応する
    Object.keys(fields).forEach((_key) => {
      const key = _key as keyof typeof fields;

      if (fields[key]) {
        entry.fields[key] = applyToMultipleLocales(fields[key]);
      }
    });

    await entry.update();

    return true;
  } catch (error) {
    Sentry.captureException(error);

    return false;
  }
};
