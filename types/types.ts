export type BlogType = "images" | "text";

export interface Blog {
    id: string;
    title: string;
    type: BlogType;
    coordinates: Coordinates;
    images: Array<Image>;
    timestamp: Date;
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