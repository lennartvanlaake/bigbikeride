type BlogType = "images" | "text";

interface Blog {
    id: string;
    title: string;
    type: BlogType;
    coordinates: Coordinates;
    images: Array<Image>;
    timestamp: Date;
}

interface Coordinates {
    long: string;
    lat: string;
}

interface Image {
    id: Number;
    path: string;
    description: string;
}