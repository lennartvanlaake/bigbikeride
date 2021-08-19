import { DefaultState, Context } from "koa";
import { connection } from "./db";
import Router from "koa-router";
import * as Jimp from "jimp";
import axios from "axios";
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

const sizes = [100, 200, 300, 500, 800];

function getResizeFilename(id: string, size: number) {
	return `${__dirname}/public/api/uploads/${id}-${size}.jpeg`;
}

async function resizeSingle(buffer: Buffer, id: string, size: number) {
	const image = await Jimp.read(buffer);
	image.resize(Jimp.AUTO, size);
	image.write(getResizeFilename(id, size));
	console.log(`Completed writing to ${getResizeFilename(id, size)}`);
}

async function resizeToAllSizes(url: string, id: string) {
	const response = await axios.get(url, {
		responseType: "arraybuffer",
	});
	const buffer = Buffer.from(response.data, "binary");
	sizes.forEach(async (size) => {
		await resizeSingle(buffer, id, size);
	});
}

export async function resizeAllImages() {
	const images: ImageEntity[] = await connection(
		IMAGE_TABLE_NAME
	).select();
	images.forEach((image) => {
		resizeToAllSizes(image.path, image.id);
	});
}

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
	await resizeToAllSizes(imageRequest.path, id);
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
