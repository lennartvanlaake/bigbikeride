import Router from "koa-router";
export const notifyRouter = new Router();
import { sendMail } from "./mail";
import { connection } from "./db";
import { SubscriberEntity, SUBSCRIBERS_TABLE_NAME } from "../types/types";

notifyRouter.post("/", async (ctx, next) => {
	const subscribers: SubscriberEntity[] = await connection(
		SUBSCRIBERS_TABLE_NAME
	).select();
	subscribers.forEach(async (subscriber) => {
		await sendMail(
			subscriber.email,
			"New content!",
			`Hello ${subscriber.name}!
			I have just updated https://lennartsbigbikeride.eu. I hope you enjoy the new story/stories! :)

			If you no longer want to receive updates, please go to ${process.env.VITE_PUBLIC_BASE_URL}/mail/${subscriber.id}/unsubscribe.
			Best,
			Lennart
			`
		);
	});
	ctx.body = {};
	await next();
});
