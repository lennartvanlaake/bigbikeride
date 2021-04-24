// blog stuff
export type BlogType = "images" | "text";

export const BLOG_TABLE_NAME = "blogs";

export const enum BlogKeys {
  ID = "id",
  TITLE = "title",
  TYPE = "type",
  LONG = "long",
  LAT = "lat",
  CREATED = "created_at",
  UPDATED = "updated_at"
}

export interface BlogEntity {
  id: string;
  title: string;
  type: BlogType;
  long: number;
  lat: number;
  created_at: Date;
  updated_at: Date;
}

export interface Blog {
  id: string;
  title: string;
  type: BlogType;
  coordinates: Coordinates;
  images: Array<Image>;
  created: Date;
}

// content blog stuff
export const CONTENT_BLOG_TABLE_NAME = "blog_content";

export const enum BlogContentKeys {
  ID = "id",
  CONTENT = "content"
}

export interface ContentBlog extends Blog {
  content: string;
}

export interface ContentBlogEntity {
  id: string;
  content: string;
}

export interface Coordinates {
  long: number;
  lat: number;
}

export const IMAGE_BLOG_TABLE_NAME = "blog_images";

export const enum ImageBlogKeys {
  BLOG_ID = "blog_id",
  IMAGE_ID = "image_id",
}

export interface ImageBlogEntity {
  blog_id: string;
  image_id: string;
}

export const IMAGE_TABLE_NAME = "images";

export const enum ImageKeys {
  ID = "id",
  PATH = "path",
  DESCRIPTION = "description",
  CREATED_AT = "created_at",
  UPDATED_AT = "updated_at",
}

export interface ImageEntity {
  id: string;
  path: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export interface Image {
  id: string;
  path: string;
  description: string;
  created: Date;
  updated: Date;
}

// requests
export interface CreateBlogRequest {
  title: string;
  type: BlogType;
  coordinates: Coordinates;
  content: string | null;
}

export interface LoginRequest {
  password: string;
}

export interface MySession {
  loggedIn: boolean;
}

declare module "koa" {
  export interface DefaultContext {
    session: any;
  }
  export interface Request {
    params: any;
  }
  export interface Context {
    session: MySession;
  }
}
