import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "chai";
import { app } from "./server";
import supertest from "supertest";
import {
	CreateBlogRequest,
	Blog,
	UPLOAD_NAME,
	MailRequest,
} from "../types/types";

let cookie: string;
let server = app.listen();
let request = supertest(server);
let blogId: string;
let imageId: string;
let allBlogsResponse: Blog[];
let oneBlogResponse: Blog;

Given("I am logged in", async () => {
	const result = await request
		.post("/api/login")
		.send({ password: "password" });
	cookie = result.headers["set-cookie"];
	expect(result.status).to.equal(200);
});

Given("I POST a blog with title {string}", async (title: string) => {
	let requestBody = {
		title: title,
		content: "",
		coordinates: {
			long: 0.0,
			lat: 0.0,
		},
		created: new Date(),
	};
	const result = await request
		.post("/api/blogs")
		.set("Cookie", cookie)
		.send(requestBody);
	blogId = result.body.id;
	expect(result.status).to.equal(200);
});

When(
	"I change the title of the blog to {string} and the content to {string}",
	async (newTitle: string, newContent: string) => {
		const requestBody: CreateBlogRequest = {
			title: newTitle,
			content: newContent,
			coordinates: {
				long: 0.0,
				lat: 0.0,
			},
			created: new Date(),
		};
		await request
			.put(`/api/blogs/${blogId}`)
			.set("Cookie", cookie)
			.send(requestBody);
	}
);

When("I GET all blogs", async () => {
	const result = await request
		.get("/api/blogs")
		.set("Cookie", cookie)
		.send();
	allBlogsResponse = result.body;
	expect(result.status).to.equal(200);
});

Then("I find the blog id of the created blog in the blogs response", () => {
	const blogIds: string[] = allBlogsResponse.map((blog) => {
		return blog.id;
	});
	expect(blogIds).to.include(blogId);
});

When("I GET the created blog", async () => {
	const result = await request
		.get("/api/blogs/" + blogId)
		.set("Cookie", cookie);
	oneBlogResponse = result.body;
	expect(result.status).to.equal(200);
});

Then("the blog in the response has title {string}", (title: string) => {
	expect(oneBlogResponse.title).to.equal(title);
});

Then("the blog in the response has content {string}", (content: string) => {
	expect(oneBlogResponse.content).to.equal(content);
});

When("I delete the created blog", async () => {
	await request
		.delete(`/api/blogs/${blogId}`)
		.set("Cookie", cookie)
		.expect(200);
});

Then("the blog is no longer returned", async () => {
	await request
		.get("/api/blogs/" + blogId)
		.set("Cookie", cookie)
		.expect(500);
});

When("I upload an image", async () => {
	const result = await request
		.post("/api/images")
		.send({ path: "https://someurl", blogId: blogId })
		.set("Cookie", cookie)
		.expect(200);
	imageId = result.body.id;
});

When(
	"I change the description of the image to {string}",
	async (description: string) => {
		await request
			.patch(`/api/images/${imageId}/description`)
			.set("Cookie", cookie)
			.send({ description: description })
			.expect(200);
	}
);

Then(
	"the blog in the response has an image with description {string}",
	(description: string) => {
		expect(oneBlogResponse.images[0].description).to.equal(
			description
		);
	}
);

When("I delete the image", async () => {
	await request
		.delete(`/api/images/${imageId}`)
		.set("Cookie", cookie)
		.expect(200);
});

When("I send an email", async () => {
	const mailBody: MailRequest = {
		message: "bla",
		sender: "doekmans@gmail.com",
	};
	await request.post("/api/mail").send(mailBody).expect(200);
});
