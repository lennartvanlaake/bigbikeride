import { sequelize, BlogEntity } from "./db"
import { Blog, CreateBlogRequest } from "../types/types";
import { NextFunction, Request, Response } from 'express';

const selectQuery = `select p.*,
(select json_agg(arr) from (select i.* from image_posts 
ip join images i on ip.image_id = i.id
where ip.post_id = p.id order by i.timestamp desc) as arr) as images,
tp.content as content
from posts p 
left join text_posts tp on p.id = tp.id `

export async function getBlogs(_: Request, response: Response) {
    const results = await sequelize.query(selectQuery) as [Array<Blog>, number]
    response.status(200).json(results[0]);
}

export async function getBlogById(request: Request, response: Response) {
    const result = await sequelize.query(selectQuery + 'where p.id = $postId', {
        bind: { postId: request.body.id },
    }) as [Array<Blog>, number]
    const blog = result[0][0]
    response.status(200).json(blog);
}

export async function createBlog(request: Request, response: Response, next: NextFunction) {
        try {
            const blogRequest: CreateBlogRequest = request.body
            const blog = await BlogEntity.create({
                title: blogRequest.title,
                type: blogRequest.type,
                long: blogRequest.coordinates.long,
                lat: blogRequest.coordinates.lat
            })
            response.status(200).json({ id: blog.id }).send()
        } catch (e) {
            next(e)
        }   
    }


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
