export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z,
   *     compliant with the 'date-time' format outlined in section 5.6 of
   *     the RFC 3339 profile of the ISO 8601 standard for representation
   *     of dates and times using the Gregorian calendar.
   */
  DateTime: any;
  /** The 'Dimension' type represents dimensions as whole numeric values between `1` and `4000`. */
  Dimension: any;
  /** The 'Quality' type represents quality as whole numeric values between `1` and `100`. */
  Quality: any;
  /** The 'HexColor' type represents color in `rgb:ffffff` string format. */
  HexColor: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type Query = {
  __typename?: "Query";
  asset?: Maybe<Asset>;
  assetCollection?: Maybe<AssetCollection>;
  dummy?: Maybe<Dummy>;
  dummyCollection?: Maybe<DummyCollection>;
  works?: Maybe<Works>;
  worksCollection?: Maybe<WorksCollection>;
  contentType3DModels?: Maybe<ContentType3DModels>;
  contentType3DModelsCollection?: Maybe<ContentType3DModelsCollection>;
};

export type QueryAssetArgs = {
  id: Scalars["String"];
  preview?: Maybe<Scalars["Boolean"]>;
  locale?: Maybe<Scalars["String"]>;
};

export type QueryAssetCollectionArgs = {
  skip?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
  preview?: Maybe<Scalars["Boolean"]>;
  locale?: Maybe<Scalars["String"]>;
  where?: Maybe<AssetFilter>;
  order?: Maybe<Array<Maybe<AssetOrder>>>;
};

export type QueryDummyArgs = {
  id: Scalars["String"];
  preview?: Maybe<Scalars["Boolean"]>;
  locale?: Maybe<Scalars["String"]>;
};

export type QueryDummyCollectionArgs = {
  skip?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
  preview?: Maybe<Scalars["Boolean"]>;
  locale?: Maybe<Scalars["String"]>;
  where?: Maybe<DummyFilter>;
  order?: Maybe<Array<Maybe<DummyOrder>>>;
};

export type QueryWorksArgs = {
  id: Scalars["String"];
  preview?: Maybe<Scalars["Boolean"]>;
  locale?: Maybe<Scalars["String"]>;
};

export type QueryWorksCollectionArgs = {
  skip?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
  preview?: Maybe<Scalars["Boolean"]>;
  locale?: Maybe<Scalars["String"]>;
  where?: Maybe<WorksFilter>;
  order?: Maybe<Array<Maybe<WorksOrder>>>;
};

export type QueryContentType3DModelsArgs = {
  id: Scalars["String"];
  preview?: Maybe<Scalars["Boolean"]>;
  locale?: Maybe<Scalars["String"]>;
};

export type QueryContentType3DModelsCollectionArgs = {
  skip?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
  preview?: Maybe<Scalars["Boolean"]>;
  locale?: Maybe<Scalars["String"]>;
  where?: Maybe<ContentType3DModelsFilter>;
  order?: Maybe<Array<Maybe<ContentType3DModelsOrder>>>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type Asset = {
  __typename?: "Asset";
  sys: Sys;
  title?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  contentType?: Maybe<Scalars["String"]>;
  fileName?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["Int"]>;
  url?: Maybe<Scalars["String"]>;
  width?: Maybe<Scalars["Int"]>;
  height?: Maybe<Scalars["Int"]>;
  linkedFrom?: Maybe<AssetLinkingCollections>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetUrlArgs = {
  transform?: Maybe<ImageTransformOptions>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type Sys = {
  __typename?: "Sys";
  id: Scalars["String"];
  spaceId: Scalars["String"];
  environmentId: Scalars["String"];
  publishedAt?: Maybe<Scalars["DateTime"]>;
  firstPublishedAt?: Maybe<Scalars["DateTime"]>;
  publishedVersion?: Maybe<Scalars["Int"]>;
};

export type ImageTransformOptions = {
  /** Desired width in pixels. Defaults to the original image width. */
  width?: Maybe<Scalars["Dimension"]>;
  /** Desired height in pixels. Defaults to the original image height. */
  height?: Maybe<Scalars["Dimension"]>;
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality?: Maybe<Scalars["Quality"]>;
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius?: Maybe<Scalars["Int"]>;
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy?: Maybe<ImageResizeStrategy>;
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus?: Maybe<ImageResizeFocus>;
  /**
   * Desired background color, used with corner radius or `PAD` resize strategy.
   *         Defaults to transparent (for `PNG`, `PNG8` and `WEBP`) or white (for `JPG` and `JPG_PROGRESSIVE`).
   */
  backgroundColor?: Maybe<Scalars["HexColor"]>;
  /** Desired image format. Defaults to the original image format. */
  format?: Maybe<ImageFormat>;
};

export enum ImageResizeStrategy {
  /** Resizes the image to fit into the specified dimensions. */
  Fit = "FIT",
  /**
   * Resizes the image to the specified dimensions, padding the image if needed.
   *         Uses desired background color as padding color.
   */
  Pad = "PAD",
  /** Resizes the image to the specified dimensions, cropping the image if needed. */
  Fill = "FILL",
  /** Resizes the image to the specified dimensions, changing the original aspect ratio if needed. */
  Scale = "SCALE",
  /** Crops a part of the original image to fit into the specified dimensions. */
  Crop = "CROP",
  /** Creates a thumbnail from the image. */
  Thumb = "THUMB",
}

export enum ImageResizeFocus {
  /** Focus the resizing on the center. */
  Center = "CENTER",
  /** Focus the resizing on the top. */
  Top = "TOP",
  /** Focus the resizing on the top right. */
  TopRight = "TOP_RIGHT",
  /** Focus the resizing on the right. */
  Right = "RIGHT",
  /** Focus the resizing on the bottom right. */
  BottomRight = "BOTTOM_RIGHT",
  /** Focus the resizing on the bottom. */
  Bottom = "BOTTOM",
  /** Focus the resizing on the bottom left. */
  BottomLeft = "BOTTOM_LEFT",
  /** Focus the resizing on the left. */
  Left = "LEFT",
  /** Focus the resizing on the top left. */
  TopLeft = "TOP_LEFT",
  /** Focus the resizing on the largest face. */
  Face = "FACE",
  /** Focus the resizing on the area containing all the faces. */
  Faces = "FACES",
}

export enum ImageFormat {
  /** JPG image format. */
  Jpg = "JPG",
  /**
   * Progressive JPG format stores multiple passes of an image in progressively higher detail.
   *         When a progressive image is loading, the viewer will first see a lower quality pixelated version which
   *         will gradually improve in detail, until the image is fully downloaded. This is to display an image as
   *         early as possible to make the layout look as designed.
   */
  JpgProgressive = "JPG_PROGRESSIVE",
  /** PNG image format */
  Png = "PNG",
  /**
   * 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
   *         The 8-bit PNG format is mostly used for simple images, such as icons or logos.
   */
  Png8 = "PNG8",
  /** WebP image format. */
  Webp = "WEBP",
}

export type AssetLinkingCollections = {
  __typename?: "AssetLinkingCollections";
  entryCollection?: Maybe<EntryCollection>;
  worksCollection?: Maybe<WorksCollection>;
  contentType3DModelsCollection?: Maybe<ContentType3DModelsCollection>;
};

export type AssetLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
  preview?: Maybe<Scalars["Boolean"]>;
  locale?: Maybe<Scalars["String"]>;
};

export type AssetLinkingCollectionsWorksCollectionArgs = {
  skip?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
  preview?: Maybe<Scalars["Boolean"]>;
  locale?: Maybe<Scalars["String"]>;
};

export type AssetLinkingCollectionsContentType3DModelsCollectionArgs = {
  skip?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
  preview?: Maybe<Scalars["Boolean"]>;
  locale?: Maybe<Scalars["String"]>;
};

export type EntryCollection = {
  __typename?: "EntryCollection";
  total: Scalars["Int"];
  skip: Scalars["Int"];
  limit: Scalars["Int"];
  items: Array<Maybe<Entry>>;
};

export type Entry = {
  sys: Sys;
};

export type WorksCollection = {
  __typename?: "WorksCollection";
  total: Scalars["Int"];
  skip: Scalars["Int"];
  limit: Scalars["Int"];
  items: Array<Maybe<Works>>;
};

/** [See type definition](https://app.contentful.com/spaces/ubif22nlfhyv/content_types/works) */
export type Works = Entry & {
  __typename?: "Works";
  sys: Sys;
  linkedFrom?: Maybe<WorksLinkingCollections>;
  title?: Maybe<Scalars["String"]>;
  description?: Maybe<WorksDescription>;
  thumbnailsCollection?: Maybe<AssetCollection>;
  model?: Maybe<ContentType3DModels>;
};

/** [See type definition](https://app.contentful.com/spaces/ubif22nlfhyv/content_types/works) */
export type WorksLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

/** [See type definition](https://app.contentful.com/spaces/ubif22nlfhyv/content_types/works) */
export type WorksTitleArgs = {
  locale?: Maybe<Scalars["String"]>;
};

/** [See type definition](https://app.contentful.com/spaces/ubif22nlfhyv/content_types/works) */
export type WorksDescriptionArgs = {
  locale?: Maybe<Scalars["String"]>;
};

/** [See type definition](https://app.contentful.com/spaces/ubif22nlfhyv/content_types/works) */
export type WorksThumbnailsCollectionArgs = {
  skip?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
  preview?: Maybe<Scalars["Boolean"]>;
  locale?: Maybe<Scalars["String"]>;
};

/** [See type definition](https://app.contentful.com/spaces/ubif22nlfhyv/content_types/works) */
export type WorksModelArgs = {
  preview?: Maybe<Scalars["Boolean"]>;
  locale?: Maybe<Scalars["String"]>;
};

export type WorksLinkingCollections = {
  __typename?: "WorksLinkingCollections";
  entryCollection?: Maybe<EntryCollection>;
};

export type WorksLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
  preview?: Maybe<Scalars["Boolean"]>;
  locale?: Maybe<Scalars["String"]>;
};

export type WorksDescription = {
  __typename?: "WorksDescription";
  json: Scalars["JSON"];
  links: WorksDescriptionLinks;
};

export type WorksDescriptionLinks = {
  __typename?: "WorksDescriptionLinks";
  entries: WorksDescriptionEntries;
  assets: WorksDescriptionAssets;
};

export type WorksDescriptionEntries = {
  __typename?: "WorksDescriptionEntries";
  inline: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  block: Array<Maybe<Entry>>;
};

export type WorksDescriptionAssets = {
  __typename?: "WorksDescriptionAssets";
  hyperlink: Array<Maybe<Asset>>;
  block: Array<Maybe<Asset>>;
};

export type AssetCollection = {
  __typename?: "AssetCollection";
  total: Scalars["Int"];
  skip: Scalars["Int"];
  limit: Scalars["Int"];
  items: Array<Maybe<Asset>>;
};

/** [See type definition](https://app.contentful.com/spaces/ubif22nlfhyv/content_types/3d-models) */
export type ContentType3DModels = Entry & {
  __typename?: "ContentType3DModels";
  sys: Sys;
  linkedFrom?: Maybe<ContentType3DModelsLinkingCollections>;
  name?: Maybe<Scalars["String"]>;
  file?: Maybe<Asset>;
  positionX?: Maybe<Scalars["Float"]>;
  positionY?: Maybe<Scalars["Float"]>;
  positionZ?: Maybe<Scalars["Float"]>;
  rotateX?: Maybe<Scalars["Int"]>;
  rotateY?: Maybe<Scalars["Int"]>;
  rotateZ?: Maybe<Scalars["Int"]>;
  scaleX?: Maybe<Scalars["Float"]>;
  scaleY?: Maybe<Scalars["Float"]>;
  scaleZ?: Maybe<Scalars["Float"]>;
};

/** [See type definition](https://app.contentful.com/spaces/ubif22nlfhyv/content_types/3d-models) */
export type ContentType3DModelsLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

/** [See type definition](https://app.contentful.com/spaces/ubif22nlfhyv/content_types/3d-models) */
export type ContentType3DModelsNameArgs = {
  locale?: Maybe<Scalars["String"]>;
};

/** [See type definition](https://app.contentful.com/spaces/ubif22nlfhyv/content_types/3d-models) */
export type ContentType3DModelsFileArgs = {
  preview?: Maybe<Scalars["Boolean"]>;
  locale?: Maybe<Scalars["String"]>;
};

/** [See type definition](https://app.contentful.com/spaces/ubif22nlfhyv/content_types/3d-models) */
export type ContentType3DModelsPositionXArgs = {
  locale?: Maybe<Scalars["String"]>;
};

/** [See type definition](https://app.contentful.com/spaces/ubif22nlfhyv/content_types/3d-models) */
export type ContentType3DModelsPositionYArgs = {
  locale?: Maybe<Scalars["String"]>;
};

/** [See type definition](https://app.contentful.com/spaces/ubif22nlfhyv/content_types/3d-models) */
export type ContentType3DModelsPositionZArgs = {
  locale?: Maybe<Scalars["String"]>;
};

/** [See type definition](https://app.contentful.com/spaces/ubif22nlfhyv/content_types/3d-models) */
export type ContentType3DModelsRotateXArgs = {
  locale?: Maybe<Scalars["String"]>;
};

/** [See type definition](https://app.contentful.com/spaces/ubif22nlfhyv/content_types/3d-models) */
export type ContentType3DModelsRotateYArgs = {
  locale?: Maybe<Scalars["String"]>;
};

/** [See type definition](https://app.contentful.com/spaces/ubif22nlfhyv/content_types/3d-models) */
export type ContentType3DModelsRotateZArgs = {
  locale?: Maybe<Scalars["String"]>;
};

/** [See type definition](https://app.contentful.com/spaces/ubif22nlfhyv/content_types/3d-models) */
export type ContentType3DModelsScaleXArgs = {
  locale?: Maybe<Scalars["String"]>;
};

/** [See type definition](https://app.contentful.com/spaces/ubif22nlfhyv/content_types/3d-models) */
export type ContentType3DModelsScaleYArgs = {
  locale?: Maybe<Scalars["String"]>;
};

/** [See type definition](https://app.contentful.com/spaces/ubif22nlfhyv/content_types/3d-models) */
export type ContentType3DModelsScaleZArgs = {
  locale?: Maybe<Scalars["String"]>;
};

export type ContentType3DModelsLinkingCollections = {
  __typename?: "ContentType3DModelsLinkingCollections";
  entryCollection?: Maybe<EntryCollection>;
  worksCollection?: Maybe<WorksCollection>;
};

export type ContentType3DModelsLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
  preview?: Maybe<Scalars["Boolean"]>;
  locale?: Maybe<Scalars["String"]>;
};

export type ContentType3DModelsLinkingCollectionsWorksCollectionArgs = {
  skip?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
  preview?: Maybe<Scalars["Boolean"]>;
  locale?: Maybe<Scalars["String"]>;
};

export type ContentType3DModelsCollection = {
  __typename?: "ContentType3DModelsCollection";
  total: Scalars["Int"];
  skip: Scalars["Int"];
  limit: Scalars["Int"];
  items: Array<Maybe<ContentType3DModels>>;
};

export type AssetFilter = {
  sys?: Maybe<SysFilter>;
  title_exists?: Maybe<Scalars["Boolean"]>;
  title?: Maybe<Scalars["String"]>;
  title_not?: Maybe<Scalars["String"]>;
  title_in?: Maybe<Array<Maybe<Scalars["String"]>>>;
  title_not_in?: Maybe<Array<Maybe<Scalars["String"]>>>;
  title_contains?: Maybe<Scalars["String"]>;
  title_not_contains?: Maybe<Scalars["String"]>;
  description_exists?: Maybe<Scalars["Boolean"]>;
  description?: Maybe<Scalars["String"]>;
  description_not?: Maybe<Scalars["String"]>;
  description_in?: Maybe<Array<Maybe<Scalars["String"]>>>;
  description_not_in?: Maybe<Array<Maybe<Scalars["String"]>>>;
  description_contains?: Maybe<Scalars["String"]>;
  description_not_contains?: Maybe<Scalars["String"]>;
  url_exists?: Maybe<Scalars["Boolean"]>;
  url?: Maybe<Scalars["String"]>;
  url_not?: Maybe<Scalars["String"]>;
  url_in?: Maybe<Array<Maybe<Scalars["String"]>>>;
  url_not_in?: Maybe<Array<Maybe<Scalars["String"]>>>;
  url_contains?: Maybe<Scalars["String"]>;
  url_not_contains?: Maybe<Scalars["String"]>;
  size_exists?: Maybe<Scalars["Boolean"]>;
  size?: Maybe<Scalars["Int"]>;
  size_not?: Maybe<Scalars["Int"]>;
  size_in?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  size_not_in?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  size_gt?: Maybe<Scalars["Int"]>;
  size_gte?: Maybe<Scalars["Int"]>;
  size_lt?: Maybe<Scalars["Int"]>;
  size_lte?: Maybe<Scalars["Int"]>;
  contentType_exists?: Maybe<Scalars["Boolean"]>;
  contentType?: Maybe<Scalars["String"]>;
  contentType_not?: Maybe<Scalars["String"]>;
  contentType_in?: Maybe<Array<Maybe<Scalars["String"]>>>;
  contentType_not_in?: Maybe<Array<Maybe<Scalars["String"]>>>;
  contentType_contains?: Maybe<Scalars["String"]>;
  contentType_not_contains?: Maybe<Scalars["String"]>;
  fileName_exists?: Maybe<Scalars["Boolean"]>;
  fileName?: Maybe<Scalars["String"]>;
  fileName_not?: Maybe<Scalars["String"]>;
  fileName_in?: Maybe<Array<Maybe<Scalars["String"]>>>;
  fileName_not_in?: Maybe<Array<Maybe<Scalars["String"]>>>;
  fileName_contains?: Maybe<Scalars["String"]>;
  fileName_not_contains?: Maybe<Scalars["String"]>;
  width_exists?: Maybe<Scalars["Boolean"]>;
  width?: Maybe<Scalars["Int"]>;
  width_not?: Maybe<Scalars["Int"]>;
  width_in?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  width_not_in?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  width_gt?: Maybe<Scalars["Int"]>;
  width_gte?: Maybe<Scalars["Int"]>;
  width_lt?: Maybe<Scalars["Int"]>;
  width_lte?: Maybe<Scalars["Int"]>;
  height_exists?: Maybe<Scalars["Boolean"]>;
  height?: Maybe<Scalars["Int"]>;
  height_not?: Maybe<Scalars["Int"]>;
  height_in?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  height_not_in?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  height_gt?: Maybe<Scalars["Int"]>;
  height_gte?: Maybe<Scalars["Int"]>;
  height_lt?: Maybe<Scalars["Int"]>;
  height_lte?: Maybe<Scalars["Int"]>;
  OR?: Maybe<Array<Maybe<AssetFilter>>>;
  AND?: Maybe<Array<Maybe<AssetFilter>>>;
};

export type SysFilter = {
  id_exists?: Maybe<Scalars["Boolean"]>;
  id?: Maybe<Scalars["String"]>;
  id_not?: Maybe<Scalars["String"]>;
  id_in?: Maybe<Array<Maybe<Scalars["String"]>>>;
  id_not_in?: Maybe<Array<Maybe<Scalars["String"]>>>;
  id_contains?: Maybe<Scalars["String"]>;
  id_not_contains?: Maybe<Scalars["String"]>;
  publishedAt_exists?: Maybe<Scalars["Boolean"]>;
  publishedAt?: Maybe<Scalars["String"]>;
  publishedAt_not?: Maybe<Scalars["String"]>;
  publishedAt_in?: Maybe<Array<Maybe<Scalars["String"]>>>;
  publishedAt_not_in?: Maybe<Array<Maybe<Scalars["String"]>>>;
  publishedAt_contains?: Maybe<Scalars["String"]>;
  publishedAt_not_contains?: Maybe<Scalars["String"]>;
  firstPublishedAt_exists?: Maybe<Scalars["Boolean"]>;
  firstPublishedAt?: Maybe<Scalars["String"]>;
  firstPublishedAt_not?: Maybe<Scalars["String"]>;
  firstPublishedAt_in?: Maybe<Array<Maybe<Scalars["String"]>>>;
  firstPublishedAt_not_in?: Maybe<Array<Maybe<Scalars["String"]>>>;
  firstPublishedAt_contains?: Maybe<Scalars["String"]>;
  firstPublishedAt_not_contains?: Maybe<Scalars["String"]>;
  publishedVersion_exists?: Maybe<Scalars["Boolean"]>;
  publishedVersion?: Maybe<Scalars["String"]>;
  publishedVersion_not?: Maybe<Scalars["String"]>;
  publishedVersion_in?: Maybe<Array<Maybe<Scalars["String"]>>>;
  publishedVersion_not_in?: Maybe<Array<Maybe<Scalars["String"]>>>;
  publishedVersion_contains?: Maybe<Scalars["String"]>;
  publishedVersion_not_contains?: Maybe<Scalars["String"]>;
};

export enum AssetOrder {
  UrlAsc = "url_ASC",
  UrlDesc = "url_DESC",
  SizeAsc = "size_ASC",
  SizeDesc = "size_DESC",
  ContentTypeAsc = "contentType_ASC",
  ContentTypeDesc = "contentType_DESC",
  FileNameAsc = "fileName_ASC",
  FileNameDesc = "fileName_DESC",
  WidthAsc = "width_ASC",
  WidthDesc = "width_DESC",
  HeightAsc = "height_ASC",
  HeightDesc = "height_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
}

/** [See type definition](https://app.contentful.com/spaces/ubif22nlfhyv/content_types/dummy) */
export type Dummy = Entry & {
  __typename?: "Dummy";
  sys: Sys;
  linkedFrom?: Maybe<DummyLinkingCollections>;
  message?: Maybe<Scalars["String"]>;
};

/** [See type definition](https://app.contentful.com/spaces/ubif22nlfhyv/content_types/dummy) */
export type DummyLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

/** [See type definition](https://app.contentful.com/spaces/ubif22nlfhyv/content_types/dummy) */
export type DummyMessageArgs = {
  locale?: Maybe<Scalars["String"]>;
};

export type DummyLinkingCollections = {
  __typename?: "DummyLinkingCollections";
  entryCollection?: Maybe<EntryCollection>;
};

export type DummyLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
  preview?: Maybe<Scalars["Boolean"]>;
  locale?: Maybe<Scalars["String"]>;
};

export type DummyFilter = {
  sys?: Maybe<SysFilter>;
  message_exists?: Maybe<Scalars["Boolean"]>;
  message?: Maybe<Scalars["String"]>;
  message_not?: Maybe<Scalars["String"]>;
  message_in?: Maybe<Array<Maybe<Scalars["String"]>>>;
  message_not_in?: Maybe<Array<Maybe<Scalars["String"]>>>;
  message_contains?: Maybe<Scalars["String"]>;
  message_not_contains?: Maybe<Scalars["String"]>;
  OR?: Maybe<Array<Maybe<DummyFilter>>>;
  AND?: Maybe<Array<Maybe<DummyFilter>>>;
};

export enum DummyOrder {
  MessageAsc = "message_ASC",
  MessageDesc = "message_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
}

export type DummyCollection = {
  __typename?: "DummyCollection";
  total: Scalars["Int"];
  skip: Scalars["Int"];
  limit: Scalars["Int"];
  items: Array<Maybe<Dummy>>;
};

export type WorksFilter = {
  model?: Maybe<CfContentType3DModelsNestedFilter>;
  sys?: Maybe<SysFilter>;
  title_exists?: Maybe<Scalars["Boolean"]>;
  title?: Maybe<Scalars["String"]>;
  title_not?: Maybe<Scalars["String"]>;
  title_in?: Maybe<Array<Maybe<Scalars["String"]>>>;
  title_not_in?: Maybe<Array<Maybe<Scalars["String"]>>>;
  title_contains?: Maybe<Scalars["String"]>;
  title_not_contains?: Maybe<Scalars["String"]>;
  thumbnailsCollection_exists?: Maybe<Scalars["Boolean"]>;
  model_exists?: Maybe<Scalars["Boolean"]>;
  OR?: Maybe<Array<Maybe<WorksFilter>>>;
  AND?: Maybe<Array<Maybe<WorksFilter>>>;
};

export type CfContentType3DModelsNestedFilter = {
  sys?: Maybe<SysFilter>;
  name_exists?: Maybe<Scalars["Boolean"]>;
  name?: Maybe<Scalars["String"]>;
  name_not?: Maybe<Scalars["String"]>;
  name_in?: Maybe<Array<Maybe<Scalars["String"]>>>;
  name_not_in?: Maybe<Array<Maybe<Scalars["String"]>>>;
  name_contains?: Maybe<Scalars["String"]>;
  name_not_contains?: Maybe<Scalars["String"]>;
  file_exists?: Maybe<Scalars["Boolean"]>;
  positionX_exists?: Maybe<Scalars["Boolean"]>;
  positionX?: Maybe<Scalars["Float"]>;
  positionX_not?: Maybe<Scalars["Float"]>;
  positionX_in?: Maybe<Array<Maybe<Scalars["Float"]>>>;
  positionX_not_in?: Maybe<Array<Maybe<Scalars["Float"]>>>;
  positionX_gt?: Maybe<Scalars["Float"]>;
  positionX_gte?: Maybe<Scalars["Float"]>;
  positionX_lt?: Maybe<Scalars["Float"]>;
  positionX_lte?: Maybe<Scalars["Float"]>;
  positionY_exists?: Maybe<Scalars["Boolean"]>;
  positionY?: Maybe<Scalars["Float"]>;
  positionY_not?: Maybe<Scalars["Float"]>;
  positionY_in?: Maybe<Array<Maybe<Scalars["Float"]>>>;
  positionY_not_in?: Maybe<Array<Maybe<Scalars["Float"]>>>;
  positionY_gt?: Maybe<Scalars["Float"]>;
  positionY_gte?: Maybe<Scalars["Float"]>;
  positionY_lt?: Maybe<Scalars["Float"]>;
  positionY_lte?: Maybe<Scalars["Float"]>;
  positionZ_exists?: Maybe<Scalars["Boolean"]>;
  positionZ?: Maybe<Scalars["Float"]>;
  positionZ_not?: Maybe<Scalars["Float"]>;
  positionZ_in?: Maybe<Array<Maybe<Scalars["Float"]>>>;
  positionZ_not_in?: Maybe<Array<Maybe<Scalars["Float"]>>>;
  positionZ_gt?: Maybe<Scalars["Float"]>;
  positionZ_gte?: Maybe<Scalars["Float"]>;
  positionZ_lt?: Maybe<Scalars["Float"]>;
  positionZ_lte?: Maybe<Scalars["Float"]>;
  rotateX_exists?: Maybe<Scalars["Boolean"]>;
  rotateX?: Maybe<Scalars["Int"]>;
  rotateX_not?: Maybe<Scalars["Int"]>;
  rotateX_in?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  rotateX_not_in?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  rotateX_gt?: Maybe<Scalars["Int"]>;
  rotateX_gte?: Maybe<Scalars["Int"]>;
  rotateX_lt?: Maybe<Scalars["Int"]>;
  rotateX_lte?: Maybe<Scalars["Int"]>;
  rotateY_exists?: Maybe<Scalars["Boolean"]>;
  rotateY?: Maybe<Scalars["Int"]>;
  rotateY_not?: Maybe<Scalars["Int"]>;
  rotateY_in?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  rotateY_not_in?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  rotateY_gt?: Maybe<Scalars["Int"]>;
  rotateY_gte?: Maybe<Scalars["Int"]>;
  rotateY_lt?: Maybe<Scalars["Int"]>;
  rotateY_lte?: Maybe<Scalars["Int"]>;
  rotateZ_exists?: Maybe<Scalars["Boolean"]>;
  rotateZ?: Maybe<Scalars["Int"]>;
  rotateZ_not?: Maybe<Scalars["Int"]>;
  rotateZ_in?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  rotateZ_not_in?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  rotateZ_gt?: Maybe<Scalars["Int"]>;
  rotateZ_gte?: Maybe<Scalars["Int"]>;
  rotateZ_lt?: Maybe<Scalars["Int"]>;
  rotateZ_lte?: Maybe<Scalars["Int"]>;
  scaleX_exists?: Maybe<Scalars["Boolean"]>;
  scaleX?: Maybe<Scalars["Float"]>;
  scaleX_not?: Maybe<Scalars["Float"]>;
  scaleX_in?: Maybe<Array<Maybe<Scalars["Float"]>>>;
  scaleX_not_in?: Maybe<Array<Maybe<Scalars["Float"]>>>;
  scaleX_gt?: Maybe<Scalars["Float"]>;
  scaleX_gte?: Maybe<Scalars["Float"]>;
  scaleX_lt?: Maybe<Scalars["Float"]>;
  scaleX_lte?: Maybe<Scalars["Float"]>;
  scaleY_exists?: Maybe<Scalars["Boolean"]>;
  scaleY?: Maybe<Scalars["Float"]>;
  scaleY_not?: Maybe<Scalars["Float"]>;
  scaleY_in?: Maybe<Array<Maybe<Scalars["Float"]>>>;
  scaleY_not_in?: Maybe<Array<Maybe<Scalars["Float"]>>>;
  scaleY_gt?: Maybe<Scalars["Float"]>;
  scaleY_gte?: Maybe<Scalars["Float"]>;
  scaleY_lt?: Maybe<Scalars["Float"]>;
  scaleY_lte?: Maybe<Scalars["Float"]>;
  scaleZ_exists?: Maybe<Scalars["Boolean"]>;
  scaleZ?: Maybe<Scalars["Float"]>;
  scaleZ_not?: Maybe<Scalars["Float"]>;
  scaleZ_in?: Maybe<Array<Maybe<Scalars["Float"]>>>;
  scaleZ_not_in?: Maybe<Array<Maybe<Scalars["Float"]>>>;
  scaleZ_gt?: Maybe<Scalars["Float"]>;
  scaleZ_gte?: Maybe<Scalars["Float"]>;
  scaleZ_lt?: Maybe<Scalars["Float"]>;
  scaleZ_lte?: Maybe<Scalars["Float"]>;
  OR?: Maybe<Array<Maybe<CfContentType3DModelsNestedFilter>>>;
  AND?: Maybe<Array<Maybe<CfContentType3DModelsNestedFilter>>>;
};

export enum WorksOrder {
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
}

export type ContentType3DModelsFilter = {
  sys?: Maybe<SysFilter>;
  name_exists?: Maybe<Scalars["Boolean"]>;
  name?: Maybe<Scalars["String"]>;
  name_not?: Maybe<Scalars["String"]>;
  name_in?: Maybe<Array<Maybe<Scalars["String"]>>>;
  name_not_in?: Maybe<Array<Maybe<Scalars["String"]>>>;
  name_contains?: Maybe<Scalars["String"]>;
  name_not_contains?: Maybe<Scalars["String"]>;
  file_exists?: Maybe<Scalars["Boolean"]>;
  positionX_exists?: Maybe<Scalars["Boolean"]>;
  positionX?: Maybe<Scalars["Float"]>;
  positionX_not?: Maybe<Scalars["Float"]>;
  positionX_in?: Maybe<Array<Maybe<Scalars["Float"]>>>;
  positionX_not_in?: Maybe<Array<Maybe<Scalars["Float"]>>>;
  positionX_gt?: Maybe<Scalars["Float"]>;
  positionX_gte?: Maybe<Scalars["Float"]>;
  positionX_lt?: Maybe<Scalars["Float"]>;
  positionX_lte?: Maybe<Scalars["Float"]>;
  positionY_exists?: Maybe<Scalars["Boolean"]>;
  positionY?: Maybe<Scalars["Float"]>;
  positionY_not?: Maybe<Scalars["Float"]>;
  positionY_in?: Maybe<Array<Maybe<Scalars["Float"]>>>;
  positionY_not_in?: Maybe<Array<Maybe<Scalars["Float"]>>>;
  positionY_gt?: Maybe<Scalars["Float"]>;
  positionY_gte?: Maybe<Scalars["Float"]>;
  positionY_lt?: Maybe<Scalars["Float"]>;
  positionY_lte?: Maybe<Scalars["Float"]>;
  positionZ_exists?: Maybe<Scalars["Boolean"]>;
  positionZ?: Maybe<Scalars["Float"]>;
  positionZ_not?: Maybe<Scalars["Float"]>;
  positionZ_in?: Maybe<Array<Maybe<Scalars["Float"]>>>;
  positionZ_not_in?: Maybe<Array<Maybe<Scalars["Float"]>>>;
  positionZ_gt?: Maybe<Scalars["Float"]>;
  positionZ_gte?: Maybe<Scalars["Float"]>;
  positionZ_lt?: Maybe<Scalars["Float"]>;
  positionZ_lte?: Maybe<Scalars["Float"]>;
  rotateX_exists?: Maybe<Scalars["Boolean"]>;
  rotateX?: Maybe<Scalars["Int"]>;
  rotateX_not?: Maybe<Scalars["Int"]>;
  rotateX_in?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  rotateX_not_in?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  rotateX_gt?: Maybe<Scalars["Int"]>;
  rotateX_gte?: Maybe<Scalars["Int"]>;
  rotateX_lt?: Maybe<Scalars["Int"]>;
  rotateX_lte?: Maybe<Scalars["Int"]>;
  rotateY_exists?: Maybe<Scalars["Boolean"]>;
  rotateY?: Maybe<Scalars["Int"]>;
  rotateY_not?: Maybe<Scalars["Int"]>;
  rotateY_in?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  rotateY_not_in?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  rotateY_gt?: Maybe<Scalars["Int"]>;
  rotateY_gte?: Maybe<Scalars["Int"]>;
  rotateY_lt?: Maybe<Scalars["Int"]>;
  rotateY_lte?: Maybe<Scalars["Int"]>;
  rotateZ_exists?: Maybe<Scalars["Boolean"]>;
  rotateZ?: Maybe<Scalars["Int"]>;
  rotateZ_not?: Maybe<Scalars["Int"]>;
  rotateZ_in?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  rotateZ_not_in?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  rotateZ_gt?: Maybe<Scalars["Int"]>;
  rotateZ_gte?: Maybe<Scalars["Int"]>;
  rotateZ_lt?: Maybe<Scalars["Int"]>;
  rotateZ_lte?: Maybe<Scalars["Int"]>;
  scaleX_exists?: Maybe<Scalars["Boolean"]>;
  scaleX?: Maybe<Scalars["Float"]>;
  scaleX_not?: Maybe<Scalars["Float"]>;
  scaleX_in?: Maybe<Array<Maybe<Scalars["Float"]>>>;
  scaleX_not_in?: Maybe<Array<Maybe<Scalars["Float"]>>>;
  scaleX_gt?: Maybe<Scalars["Float"]>;
  scaleX_gte?: Maybe<Scalars["Float"]>;
  scaleX_lt?: Maybe<Scalars["Float"]>;
  scaleX_lte?: Maybe<Scalars["Float"]>;
  scaleY_exists?: Maybe<Scalars["Boolean"]>;
  scaleY?: Maybe<Scalars["Float"]>;
  scaleY_not?: Maybe<Scalars["Float"]>;
  scaleY_in?: Maybe<Array<Maybe<Scalars["Float"]>>>;
  scaleY_not_in?: Maybe<Array<Maybe<Scalars["Float"]>>>;
  scaleY_gt?: Maybe<Scalars["Float"]>;
  scaleY_gte?: Maybe<Scalars["Float"]>;
  scaleY_lt?: Maybe<Scalars["Float"]>;
  scaleY_lte?: Maybe<Scalars["Float"]>;
  scaleZ_exists?: Maybe<Scalars["Boolean"]>;
  scaleZ?: Maybe<Scalars["Float"]>;
  scaleZ_not?: Maybe<Scalars["Float"]>;
  scaleZ_in?: Maybe<Array<Maybe<Scalars["Float"]>>>;
  scaleZ_not_in?: Maybe<Array<Maybe<Scalars["Float"]>>>;
  scaleZ_gt?: Maybe<Scalars["Float"]>;
  scaleZ_gte?: Maybe<Scalars["Float"]>;
  scaleZ_lt?: Maybe<Scalars["Float"]>;
  scaleZ_lte?: Maybe<Scalars["Float"]>;
  OR?: Maybe<Array<Maybe<ContentType3DModelsFilter>>>;
  AND?: Maybe<Array<Maybe<ContentType3DModelsFilter>>>;
};

export enum ContentType3DModelsOrder {
  NameAsc = "name_ASC",
  NameDesc = "name_DESC",
  PositionXAsc = "positionX_ASC",
  PositionXDesc = "positionX_DESC",
  PositionYAsc = "positionY_ASC",
  PositionYDesc = "positionY_DESC",
  PositionZAsc = "positionZ_ASC",
  PositionZDesc = "positionZ_DESC",
  RotateXAsc = "rotateX_ASC",
  RotateXDesc = "rotateX_DESC",
  RotateYAsc = "rotateY_ASC",
  RotateYDesc = "rotateY_DESC",
  RotateZAsc = "rotateZ_ASC",
  RotateZDesc = "rotateZ_DESC",
  ScaleXAsc = "scaleX_ASC",
  ScaleXDesc = "scaleX_DESC",
  ScaleYAsc = "scaleY_ASC",
  ScaleYDesc = "scaleY_DESC",
  ScaleZAsc = "scaleZ_ASC",
  ScaleZDesc = "scaleZ_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
}

export type WorksQueryVariables = Exact<{ [key: string]: never }>;

export type WorksQuery = { __typename?: "Query" } & {
  worksCollection?: Maybe<
    { __typename?: "WorksCollection" } & {
      items: Array<
        Maybe<
          { __typename?: "Works" } & Pick<Works, "title"> & {
              description?: Maybe<
                { __typename?: "WorksDescription" } & Pick<
                  WorksDescription,
                  "json"
                >
              >;
              thumbnailsCollection?: Maybe<
                { __typename?: "AssetCollection" } & {
                  items: Array<
                    Maybe<
                      { __typename?: "Asset" } & Pick<
                        Asset,
                        "height" | "url" | "width"
                      >
                    >
                  >;
                }
              >;
              model?: Maybe<
                { __typename?: "ContentType3DModels" } & Pick<
                  ContentType3DModels,
                  | "positionX"
                  | "positionY"
                  | "positionZ"
                  | "rotateX"
                  | "rotateY"
                  | "rotateZ"
                  | "scaleX"
                  | "scaleY"
                  | "scaleZ"
                > & {
                    file?: Maybe<
                      { __typename?: "Asset" } & Pick<
                        Asset,
                        "contentType" | "fileName" | "size" | "url"
                      >
                    >;
                  }
              >;
            }
        >
      >;
    }
  >;
};
