import { DefaultState, Context } from "koa";
import { connection } from "./db";
import Router from "koa-router";
import * as Jimp from "jimp";
import axios from "axios";
import * as fs from "fs";
import {
	Identity,
	staticImages,
	imageSizes,
	getResizeFileName,
	Image,
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

function getResizeFilePath(id: string, size: number) {
	return `${__dirname}/public${getResizeFileName(id, size)}`;
}

async function resizeSingle(buffer: Buffer, id: string, size: number) {
	const filename = getResizeFilePath(id, size);
	const image = await Jimp.read(buffer);
	image.resize(Jimp.AUTO, size);
	image.write(filename);
	await new Promise((resolve) => setTimeout(resolve, 100));
	console.log(`Completed writing to ${filename}`);
}

function resizedFilesExist(image: Image): boolean {
	return imageSizes.every((size) => {
		const path = getResizeFilePath(image.id, size);
		console.log(`checking existence of ${path}`);
		return fs.existsSync(path);
	});
}

async function resizeToAllSizes(image: Image) {
	try {
		if (resizedFilesExist(image)) {
			console.log(`All sizes exist for image ${image.id}`);
			return;
		}
		const response = await axios.get(image.path, {
			responseType: "arraybuffer",
		});
		const buffer = Buffer.from(response.data, "binary");
		imageSizes.forEach(async (size) => {
			await resizeSingle(buffer, image.id, size);
		});
	} catch (e) {
		console.error(`Failed resizing image ${image.id}`);
		console.error(e);
	}
}

export async function resizeImages(images: Image[]) {
	images.forEach((image) => {
		resizeToAllSizes(image);
	});
}

export async function resizeDatabaseImages(): Promise<void> {
	return new Promise(async () => {
		const images: Image[] = await connection(
			IMAGE_TABLE_NAME
		).select();
		await resizeImages(images);
	});
}

export async function resizeStaticImages(): Promise<void> {
	return new Promise(async () => {
		await resizeImages(staticImages);
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
	await resizeToAllSizes(imageEntity);
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
