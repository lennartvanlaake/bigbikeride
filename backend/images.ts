import { DefaultState, Context } from "koa";
import { connection } from "./db";
import path from "path";
import Router from "koa-router";
import multer from "@koa/multer";
import fs from "fs";
import {
	ImageBlogEntity,
	ImageEntity,
	ImageKeys,
	IMAGE_BLOG_TABLE_NAME,
	IMAGE_TABLE_NAME,
	UpdateImageDescriptionRequest,
	UPLOAD_NAME,
} from "../types/types";
import { v4 } from "uuid";
export const imagesRouter = new Router<DefaultState, Context>();
const uploadDir = "api/uploads";
const storage = multer.diskStorage({
	destination: function (_req, _file, cb) {
		cb(null, __dirname + `/public/${uploadDir}`);
	},
	filename: function (_req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});
const upload = multer({ storage: storage });

imagesRouter.post("/", upload.single(UPLOAD_NAME), async (ctx, next) => {
	const file = ctx.file;
	if (!file) {
		ctx.status = 400;
		await next();
	}
	const id = v4();
	const timestamp = new Date();
	const imageEntity: ImageEntity = {
		id: id,
		description: null,
		path: `${uploadDir}/${file.filename}`,
		created_at: timestamp,
		updated_at: timestamp,
	};
	await connection(IMAGE_TABLE_NAME).insert(imageEntity);
	ctx.body = id;
	ctx.type = "text/plain";
});

imagesRouter.post("/:id/post/:post", async (ctx, next) => {
	const entity: ImageBlogEntity = {
		blog_id: ctx.params.post,
		image_id: ctx.params.id,
	};
	await connection(IMAGE_BLOG_TABLE_NAME).insert(entity);
	ctx.body = "success!";
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
	const imagePath = <Partial<ImageEntity>>(
		await connection(IMAGE_TABLE_NAME)
			.select(ImageKeys.PATH)
			.where(ImageKeys.ID, ctx.params.id)
			.first()
	);

	fs.unlinkSync(__dirname + `/public/${imagePath.path}`);
	await connection(IMAGE_TABLE_NAME)
		.delete()
		.where(ImageKeys.ID, ctx.params.id);
	ctx.body = "success!";
	await next();
});
