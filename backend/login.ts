import { DefaultState, Context, Middleware } from "koa";
import Router from "koa-router"
import { LoginRequest } from "../types/types";

export const loginRouter = new Router<DefaultState, Context>();

loginRouter.post("/", async(ctx, next) => {
    const loginRequest = <LoginRequest>ctx.request.body 
    if (loginRequest.password != process.env.PASSWORD) {
        ctx.throw(401, "wrong password")
    }
    ctx.session.loggedIn = true;
    await next();
})

loginRouter.get("/", async(ctx, next) => {
    if (!ctx?.session?.loggedIn) {
        ctx.throw(403, "not logged in")
    }
    await next();
})


export const checkLogin: Middleware = async (ctx, next) => {
    if (ctx.method == 'GET' || ctx.request.url.includes('login')) {
        await next()
    } else {
        if (!ctx?.session?.loggedIn) {
            ctx.throw(403, "not logged in")
        }
        await next()
    }
}

