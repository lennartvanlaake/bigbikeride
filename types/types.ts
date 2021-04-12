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
    loggedIn: boolean
}
declare module 'koa' {
    export interface DefaultContext {
        session: any
    }
    export interface Request {
      params: any;
    }
    export interface Context {
        session: MySession;
    }
  }

