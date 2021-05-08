import { blogsRouter } from "./blogs";
import { imagesRouter } from "./images";
import { checkLogin, loginRouter } from "./login";
import { DefaultState, Context, DefaultContext } from "koa";
import Koa from "koa";
import Router from "koa-router";
import json from "koa-json";
import bodyParser from "koa-bodyparser";
import logger from "koa-logger";
import session from "koa-session";
import cors = require("@koa/cors");
import serve = require("koa-static");

// base config
export const app = new Koa<DefaultState, DefaultContext>();
app.keys = [process.env.SECRET || "fake_key"];
const router = new Router<DefaultState, Context>();
const port = process.env.PORT || 5000;

// middleware
app.use(json());
app.use(cors());
app.use(bodyParser());
app.use(checkLogin);
app.use(session({ key: process.env.SECRET, domain: process.env.DOMAIN }, app));
app.use(serve(__dirname + "public"));
app.use(logger());

router.use("/api/blogs", blogsRouter.routes(), blogsRouter.allowedMethods());
router.use("/api/login", loginRouter.routes(), loginRouter.allowedMethods());
router.use("/api/images", imagesRouter.routes(), imagesRouter.allowedMethods());
app.use(router.routes());
app.use(router.allowedMethods());

// Set upload dir
app.listen(port, () => {
	console.log(`Server is up at port ${port}`);
});
