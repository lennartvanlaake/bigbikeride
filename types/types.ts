import Koa from "koa";

// enums
export type BlogType = "images" | "text";

// base interfaces
export interface Blog {
    id: string;
    title: string;
    type: BlogType;
    coordinates: Coordinates;
    images: Array<Image>;
    created: Date;
}

export interface Coordinates {
    long: string;
    lat: string;
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

// koa extensions to make typescript happy
export interface AppState extends Koa.DefaultState {}
export interface AppContext extends Koa.DefaultContext {
    session: any
}

export interface MySession {
    loggedIn: boolean
}
declare module 'koa' {
    export interface Request {
      params: any;
    }
    export interface Context {
        session: MySession;
    }
  }

