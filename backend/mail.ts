import Router from "koa-router";
export const mailRouter = new Router();

import { MailRequest } from "../types/types";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	service: "SendinBlue", // no need to set host or port etc.
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASSWORD,
	},
});

mailRouter.post("/", async (ctx, next) => {
	const mailRequest: MailRequest = ctx.request.body;
	debugger;
	await transporter.sendMail({
		from: process.env.EMAIL,
		to: process.env.EMAIL,
		subject: "message from the blog",
		text: mailRequest.message,
	});
	ctx.body = {};
	await next();
});
