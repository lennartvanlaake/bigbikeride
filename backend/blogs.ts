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
  ImageBlogKeys,
  ImageEntity,
  ImageKeys,
  IMAGE_BLOG_TABLE_NAME,
  IMAGE_TABLE_NAME,
} from "../types/types";
import Router from "koa-router";
import { v4 } from "uuid";

const selectBlogs = connection(BLOG_TABLE_NAME)
  .leftJoin(
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

type BlogQueryResult = {
   images: [ImageEntity]
   content: string
} & BlogEntity

export const blogsRouter = new Router();

blogsRouter.get("/", async (ctx, next) => {
  ctx.body = await findAllBlogs()
  console.log(ctx.body)
  await next()
});

const findAllBlogs = async(): Promise<BlogQueryResult[]> => {
  return selectBlogs
}

blogsRouter.get("/:id", async (ctx, next) => {
  console.log(ctx);
  console.log(next);
  // const result = await sequelize.query(selectQuery + 'where p.id = $postId', {
  //     bind: { postId: ctx.request.params.id },
  // }) as [Array<Blog>, number]
  // ctx.body = result[0][0];
  // await next();
});

blogsRouter.post("/", async (ctx, next) => {
  const blogRequest = <CreateBlogRequest>ctx.request.body;
  const id = v4();
  const now = new Date();

  const blogEntity: BlogEntity = {
      id: id,
      title: blogRequest.title,
      type: blogRequest.type,
      long: blogRequest.coordinates.long,
      lat: blogRequest.coordinates.lat,
      created_at: now,
      updated_at: now
    }  
  await connection(BLOG_TABLE_NAME).insert(blogEntity);
  
  if (blogRequest.type == "text") {
    const content: ContentBlogEntity = {
      id: id,
      content: blogRequest.content!!,
    }
    await connection(CONTENT_BLOG_TABLE_NAME).insert(content);
  }
  
  ctx.body = { id: id };
  await next();
});

// return safeQuery(response, `INSERT INTO posts(id, title, type, longitude, latitude, "timestamp")
//         VALUES ($1, $2, $3, $4, $5, $6)`, [id, title, type, longitude, latitude, timestamp],
//     (_) => {
//         if (type == "text") {
//             return safeQuery(response, `INSERT INTO text_posts (id, content) VALUES ($1, $2)`,
//              [id, content], (_) => {
//                 return response.status(200).json({ "id": id })
//              })
//         } else {
//             return response.status(200).json({ "id": id })
//         }
//     })

// export const updateBlog = (request, response) => {
//     if (!request.session.loggedIn) {
//         return response.status(401).send({
//             message: 'Not logged in'
//         })
//     }
//     const { title, content, longitude, latitude, type } = request.body
//     const id = request.params.id
//     return safeQuery(response, `UPDATE posts
//                 SET title = $1,
//                 longitude = $2,
//                 latitude =  $3
//                 WHERE id = $4`, [title, longitude, latitude, id], (results) => {
//         if (type == "text") {
//             return safeQuery(response, `UPDATE text_posts SET content = $1 WHERE id = $2`, [content, id],
//                 (_) => {
//                     response.status(200).json({ "id": id })
//                 })
//         } else {
//             return response.status(200).json({ "id": id })
//         }
//     })
// }

// export const deleteBlog = (request, response) => {
//     if (!request.session.loggedIn) {
//         return response.status(401).send({
//             message: 'Not logged in'
//         })
//     }
//     return safeQuery(response, 'DELETE FROM posts WHERE id = $1', [request.params.id], (_) => {
//         response.status(200).json({ "id": request.params.id })
//     })
// }
