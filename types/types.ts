// blog stuff
export const BLOG_TABLE_NAME = "blogs";

export const enum BlogKeys {
	ID = "id",
	TITLE = "title",
	LONG = "long",
	LAT = "lat",
	CREATED = "created_at",
	UPDATED = "updated_at",
}

export interface BlogEntity {
	id: string;
	title: string;
	long: number;
	lat: number;
	created_at: Date;
	updated_at: Date;
}

export interface Blog {
	id: string;
	index: number;
	title: string;
	coordinates: Coordinates;
	images: Array<Image>;
	created: Date;
	content: string | null;
}

// content blog stuff
export const CONTENT_BLOG_TABLE_NAME = "blog_content";

export const enum BlogContentKeys {
	ID = "id",
	CONTENT = "content",
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

// image stuff
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
	description: string | null;
	created_at: Date;
	updated_at: Date;
}

export interface Image {
	id: string;
	path: string;
	description: string | null;
	created: Date;
	updated: Date;
}

// subscription stuff
export const SUBSCRIBERS_TABLE_NAME = "subscribers";

export const enum SubscriberKeys {
	ID = "id",
	EMAIL = "email",
	NAME = "name",
}

export interface SubscriberEntity {
	id: string;
	name: string;
	email: string;
}

// requests
export interface CreateBlogRequest {
	title: string;
	coordinates: Coordinates;
	content: string | null;
	created: Date | null;
}

export interface UpdateImageDescriptionRequest {
	description: string | null;
}

export interface CreateImageRequest {
	path: string;
	blogId: string;
	description: string;
}

export interface Identity {
	id: string;
}

export interface LoginRequest {
	password: string;
}

export interface LoginResponse {
	loggedIn: boolean;
}

export interface MailRequest {
	message: string;
	sender: string;
}

export interface SubscribeRequest {
	name: string;
	email: string;
}

export interface NotifyRequest {
	message: string;
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

export type OverlayType = "AboutMe" | "Gear" | "Blog" | "Contact";
