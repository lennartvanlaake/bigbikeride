import { DefaultState, Context } from "koa";
import { connection } from "./db";
import Router from "koa-router";
import {
	Identity,
	ImageBlogEntity,
	ImageEntity,
	ImageKeys,
	IMAGE_BLOG_TABLE_NAME,
	IMAGE_TABLE_NAME,
	UpdateImageDescriptionRequest,
	CreateImageRequest,
} from "../types/types";
import { v4 } from "uuid";
export const imagesRouter = new Router<DefaultState, Context>();

imagesRouter.post("/", async (ctx, next) => {
	const imageRequest: CreateImageRequest = ctx.request.body;
	if (!imageRequest.path) {
		throw new Error(`No path provided for image`);
	}
	const id = v4();
	const timestamp = new Date();
	const imageEntity: ImageEntity = {
		id: id,
		description: imageRequest.description,
		path: imageRequest.path,
		created_at: timestamp,
		updated_at: timestamp,
	};
	await connection(IMAGE_TABLE_NAME).insert(imageEntity);
	const entity: ImageBlogEntity = {
		blog_id: imageRequest.blogId,
		image_id: id,
	};
	await connection(IMAGE_BLOG_TABLE_NAME).insert(entity);
	ctx.body = <Identity>{ id: id };
	await next();
});

imagesRouter.patch("/:id/description", async (ctx, next) => {
	const request: UpdateImageDescriptionRequest = ctx.request.body;
	const now = new Date();
	await connection(IMAGE_TABLE_NAME)
		.update(ImageKeys.DESCRIPTION, request.description)
		.update(ImageKeys.UPDATED_AT, now)
		.where(ImageKeys.ID, ctx.params.id);
	ctx.body = "success!";
	await next();
});

imagesRouter.delete("/:id", async (ctx, next) => {
	await connection(IMAGE_TABLE_NAME)
		.delete()
		.where(ImageKeys.ID, ctx.params.id);
	ctx.body = "success!";
	await next();
});
