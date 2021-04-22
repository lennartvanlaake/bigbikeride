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
      	(select i.* from image_blogs ip join images i on ip.image_id = i.id
	 where ip.post_id = p.id order by i.timestamp desc)
       as arr)
     as images`),
    CONTENT_BLOG_TABLE_NAME + BlogContentKeys.CONTENT
  );

export const blogsRouter = new Router();

blogsRouter.get("/", async (ctx, next) => {
  ctx.body = await findAllBlogs()
  await next()
});

const findAllBlogs = async() => {
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
  connection
    .insert(<BlogEntity>{
      id: id,
      title: blogRequest.title,
      type: blogRequest.type,
      long: blogRequest.coordinates.long,
      lat: blogRequest.coordinates.lat,
    })
    .returning("id")
    .toString();
  if (blogRequest.type == "text") {
    connection.insert(<ContentBlogEntity>{
      id: id,
      content: blogRequest.content,
    });
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
