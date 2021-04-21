// blog stuff
export type BlogType = "images" | "text";

export const BLOG_TABLE_NAME = "blogs";

export enum BlogKeys {
  ID = "id",
  TITLE = "title",
  TYPE = "type",
  LONG = "long",
  LAT = "lat",
  CREATED = "created",
}

export interface BlogEntity {
  id: string;
  title: string;
  type: BlogType;
  long: number;
  lat: number;
  created: Date;
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


export enum BlogContentKeys {
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

export interface Image {
  id: Number;
  path: string;
  description: string;
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
