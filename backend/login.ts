import { DefaultState, Context, Middleware } from "koa";
import Router from "koa-router";
import { LoginRequest, LoginResponse } from "../types/types";

export const loginRouter = new Router<DefaultState, Context>();

loginRouter.post("/", async (ctx, next) => {
	const loginRequest = ctx.request.body as LoginRequest;
	if (loginRequest.password != process.env.PASSWORD) {
		ctx.throw(401, "wrong password");
	}
	ctx.session.loggedIn = true;
	ctx.body = "login success";
	await next();
});

loginRouter.get("/", async (ctx, next) => {
	ctx.body = {
		loggedIn: ctx?.session?.loggedIn ?? false,
	} as LoginResponse;
	await next();
});

export const checkLogin: Middleware = async (ctx, next) => {
	if (ctx.method == "GET") {
		await next();
	} else {
		if (!ctx?.session?.loggedIn) {
			ctx.throw(403, "not logged in");
		}
		await next();
	}
};
