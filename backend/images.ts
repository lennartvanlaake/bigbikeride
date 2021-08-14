import { DefaultState, Context } from "koa";
import { connection } from "./db";
import Router from "koa-router";
import axios from "axios";
import sharp from "sharp";
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

async function resizeSingle(url: string, id: string, size: number) {
	try {
		const response = await axios.get(url, {
			responseType: "arraybuffer",
		});
		debugger;
		const buffer = Buffer.from(response.data, "binary");
		await sharp(buffer)
			.resize(size)
			.toFile(getResizeFilename(id, size));
	} catch (e) {
		console.debug(e);
		return false;
	}
}

async function resizeToAllSizes(url: string, id: string) {
	let success = true;
	sizes.forEach(async (size) => {
		if (!(await resizeSingle(url, id, size))) {
			success = false;
		}
	});
	return success;
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
	let resizeSuccess = await resizeToAllSizes(imageRequest.path, id);
	if (!resizeSuccess) {
		throw new Error(`Resizing image failed`);
	}
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
