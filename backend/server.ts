import { blogsRouter } from './blogs';
import { checkLogin, loginRouter } from './login';
import { DefaultState, Context, DefaultContext } from "koa";
import Koa from "koa";
import Router from "koa-router"
import json from "koa-json"
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import session from 'koa-session';
const serve = require("koa-static")

// base config
export const app = new Koa<DefaultState, DefaultContext>();
app.keys = [ process.env.SECRET || "fake_key" ]
const router = new Router<DefaultState, Context>();
const port = process.env.PORT || 5000;

// middleware
app.use(json());
app.use(bodyParser());
app.use(checkLogin)
app.use(session({key: process.env.SECRET}, app))
app.use(serve(__dirname + 'public'));
app.use(logger())

router.use("/api/blogs", blogsRouter.routes(), blogsRouter.allowedMethods());
router.use("/api/login", loginRouter.routes(), loginRouter.allowedMethods());

app.use(router.routes());
app.use(router.allowedMethods());
// Blog crud actions
// app.put('/api/blogs/:id', jsonParser, blogs.updateBlog);
// app.delete('/api/blogs/:id', blogs.deleteBlog);



// import path from 'path';
// import login from './login';
// import images from './images';
// import multer from 'multer';
// // uploads
// var storage = multer.diskStorage({
//    destination: function (req, file, cb) {
//      cb(null, 'public/')
//    },
//    filename: function (req, file, cb) {
//       cb(null, Date.now() + path.extname(file.originalname))
//     } 
//  })
// const upload = multer({ storage: storage })
// app.post('/api/images', upload.single('filepond'), images.createImage);
// app.post('/api/images/:id/post/:post', jsonParser, images.linkImageToPost);
// app.put('/api/images/:id/description', jsonParser, images.updateImageDescription);


// Set upload dir
app.listen(port, () => {
   console.log(`Server is up at port ${port}`);
});
