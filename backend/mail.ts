import Router from "koa-router";
export const mailRouter = new Router();

import { connection } from "./db";
import {
	SubscriberEntity,
	SUBSCRIBERS_TABLE_NAME,
	SubscribeRequest,
	SubscriberKeys,
	MailRequest,
} from "../types/types";
import { v4 } from "uuid";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	service: "SendinBlue", // no need to set host or port etc.
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASSWORD,
	},
});

export async function sendMail(to: string, subject: string, text: string) {
	await transporter.sendMail({
		from: process.env.EMAIL,
		to: to,
		subject: subject,
		text: text,
	});
}

mailRouter.post("/", async (ctx, next) => {
	const mailRequest: MailRequest = ctx.request.body;
	await sendMail(
		process.env.EMAIL,
		"message from the blog",
		mailRequest.message + " sender: " + mailRequest.sender
	);
	ctx.body = {};
	await next();
});

mailRouter.post("/subscription", async (ctx, next) => {
	const request: SubscribeRequest = ctx.request.body;
	const id = v4();
	const subscriber: SubscriberEntity = {
		id: id,
		name: request.name,
		email: request.email,
	};
	await connection(SUBSCRIBERS_TABLE_NAME).insert(subscriber);
	await sendMail(
		request.email,
		"Thank you for subscribing!",
		`Hello ${request.name}!
		Thank you for subscribing to my blog. If you no longer want to receive updates, please go to ${process.env.VITE_PUBLIC_BASE_URL}/mail/${id}/unsubscribe.
		Best,
		Lennart
		`
	);
	ctx.body = { id: id };
	await next();
});

mailRouter.get("/:id/unsubscribe", async (ctx, next) => {
	await connection(SUBSCRIBERS_TABLE_NAME)
		.delete()
		.where(SubscriberKeys.ID, ctx.params.id);
	ctx.body = "You have been unsubscribed. Have a nice day!";
	await next();
});
