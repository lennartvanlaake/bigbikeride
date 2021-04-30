
import { DefaultState, Context } from "koa";
import { connection } from "./db";
import path from 'path';
import Router from "koa-router";
import multer from "@koa/multer";
import { ImageBlogEntity, ImageEntity, ImageKeys, IMAGE_BLOG_TABLE_NAME, IMAGE_TABLE_NAME, UpdateImageDescriptionRequest} from "../types/types";
import { v4 } from "uuid";
export const imagesRouter = new Router<DefaultState, Context>();


 const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
      cb(null, 'public/')
    },
    filename: function (_req, file, cb) {
       cb(null, Date.now() + path.extname(file.originalname))
     } 
  })
const upload = multer({ storage: storage });

imagesRouter.post("/", upload.single('filepond'), async(ctx, next) => {
   let multerReq = <multer.MulterIncomingMessage>ctx.req;
   let file = multerReq.file;
   if (!file) {
      ctx.status = 400;
      next()
   }
   const id = v4();
   const timestamp = new Date();
   const imageEntity: ImageEntity = {
    id: id,
    description: null,
    path: file.path,
    created_at: timestamp,
    updated_at: timestamp
   }
   await connection(IMAGE_TABLE_NAME).insert(imageEntity);
   ctx.body = "success!";
})

imagesRouter.post("/:id/post/:post", async(ctx, next) => { 
   const entity: ImageBlogEntity = {
     blog_id: ctx.params.post,
     image_id: ctx.params.id
   }
   await connection(IMAGE_BLOG_TABLE_NAME).insert(entity);
   ctx.body = "success!";
   next();
})

imagesRouter.put(":id/description", async(ctx, next) => {
   const request: UpdateImageDescriptionRequest = ctx.body  
   const now = new Date();
   await connection(IMAGE_TABLE_NAME)
      .update(ImageKeys.DESCRIPTION, request.description)
      .update(ImageKeys.UPDATED_AT, now)
      .where(ImageKeys.ID, ctx.params.id)
   ctx.body = "success!";
   next();
})


