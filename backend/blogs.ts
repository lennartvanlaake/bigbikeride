import { connection } from "./db";
import {
	Blog,
	BlogContentKeys,
	BlogEntity,
	BlogKeys,
	BLOG_TABLE_NAME,
	ContentBlogEntity,
	CONTENT_BLOG_TABLE_NAME,
	CreateBlogRequest,
	Image,
	ImageBlogKeys,
	ImageEntity,
	ImageKeys,
	IMAGE_BLOG_TABLE_NAME,
	IMAGE_TABLE_NAME,
} from "../types/types";
import Router from "koa-router";
import { v4 } from "uuid";

const baseSelectQuery = () => {
	return connection(BLOG_TABLE_NAME)
		.leftOuterJoin(
			CONTENT_BLOG_TABLE_NAME,
			BLOG_TABLE_NAME + "." + BlogKeys.ID,
			CONTENT_BLOG_TABLE_NAME + "." + BlogContentKeys.ID
		)
		.select(
			BLOG_TABLE_NAME + ".*",
			connection.raw(`(select json_agg(arr) from 
      	(select ${IMAGE_TABLE_NAME}.* from ${IMAGE_BLOG_TABLE_NAME}
	 join ${IMAGE_TABLE_NAME} on 
	 ${IMAGE_BLOG_TABLE_NAME}.${ImageBlogKeys.IMAGE_ID} = ${IMAGE_TABLE_NAME}.${ImageKeys.ID}
	 where 
	 ${IMAGE_BLOG_TABLE_NAME}.${ImageBlogKeys.BLOG_ID} = ${BLOG_TABLE_NAME}.${BlogKeys.ID}
	 order by ${IMAGE_TABLE_NAME}.${ImageKeys.CREATED_AT} desc)
       as arr)
     as images`),
			CONTENT_BLOG_TABLE_NAME + "." + BlogContentKeys.CONTENT
		);
};

interface BlogQueryResult extends BlogEntity {
	images: [ImageEntity];
	content: string;
}

function toBlog(queryResult: BlogQueryResult): Blog {
	return {
		...queryResult,
		created: queryResult.created_at,
		coordinates: {
			long: queryResult.long,
			lat: queryResult.lat,
		},
		images: queryResult.images?.map((imageEntity) => {
			return toImage(imageEntity);
		}),
	};
}

function toImage(imageEntity: ImageEntity): Image {
	return {
		...imageEntity,
		created: imageEntity.created_at,
		updated: imageEntity.updated_at,
	};
}
export const blogsRouter = new Router();

blogsRouter.get("/", async (ctx, next) => {
	const queryResult = await findAllBlogs();
	ctx.body = queryResult.map((queryResult) => {
		return toBlog(queryResult);
	});
	await next();
});

const findAllBlogs = async (): Promise<BlogQueryResult[]> => {
	return baseSelectQuery();
};

blogsRouter.get("/:id", async (ctx, next) => {
	ctx.body = toBlog(await findBlog(ctx.params.id));
	next();
});

const findBlog = async (id: string): Promise<BlogQueryResult> => {
	const query = baseSelectQuery().where(
		BLOG_TABLE_NAME + "." + BlogKeys.ID,
		id
	);
	const result: BlogQueryResult[] = await query;
	if (result.length != 1) {
		throw new Error(
			`found ${result.length} blogs when fetching one`
		);
	}
	return result[0];
};

blogsRouter.post("/", async (ctx, next) => {
	const blogRequest: CreateBlogRequest = ctx.request.body;
	const id = v4();
	const now = new Date();

	const blogEntity: BlogEntity = {
		id: id,
		title: blogRequest.title,
		long: blogRequest.coordinates.long,
		lat: blogRequest.coordinates.lat,
		created_at: now,
		updated_at: now,
	};
	await connection(BLOG_TABLE_NAME).insert(blogEntity);

	if (blogRequest.content) {
		const content: ContentBlogEntity = {
			id: id,
			content: blogRequest.content!!,
		};
		await connection(CONTENT_BLOG_TABLE_NAME).insert(content);
	}

	ctx.body = { id: id };
	await next();
});

blogsRouter.put("/:id", async (ctx, next) => {
	const blogRequest: CreateBlogRequest = ctx.request.body;
	const now = new Date();
	await connection(BLOG_TABLE_NAME)
		.update(BlogKeys.LAT, blogRequest.coordinates.lat)
		.update(BlogKeys.LONG, blogRequest.coordinates.long)
		.update(BlogKeys.TITLE, blogRequest.title)
		.update(BlogKeys.UPDATED, now)
		.where(BlogKeys.ID, ctx.params.id);
	if (blogRequest.content) {
		await connection(CONTENT_BLOG_TABLE_NAME)
			.update(BlogContentKeys.CONTENT, blogRequest.content!!)
			.where(BlogContentKeys.ID, ctx.params.id);
	}
	ctx.body = "success!";
	await next();
});

blogsRouter.delete("/:id", async (ctx, next) => {
	await connection(BLOG_TABLE_NAME)
		.delete()
		.where(BlogKeys.ID, ctx.params.id);
	ctx.body = "success!";
	await next();
});
