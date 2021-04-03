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

// session stuff
// @ts-ignore
declare module 'express-session' {
    export interface SessionData {
      loggedIn: { [key: string]: boolean };
    }
  }