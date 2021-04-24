// @ts-ignore
import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "chai";
import { app } from "./server";
import supertest from "supertest";
import { CreateBlogRequest, Blog } from "../types/types";

let cookie: string;
let server = app.listen();
let request = supertest(server);
let blogId: string;
let allBlogsResponse: Blog[];

Given("I am logged in", async () => {
  const result = await request
    .post("/api/login")
    .send({ password: "password" });
  cookie = result.headers["set-cookie"];
  expect(result.status).to.equal(200);
});

Given("I POST a blog with title {string}", async (title: string) => {
  const requestBody: CreateBlogRequest = {
    title: title,
    type: "text",
    content: "",
    coordinates: {
      long: 0.0,
      lat: 0.0,
    },
  };
  const result = await request
    .post("/api/blogs")
    .set("Cookie", cookie)
    .send(requestBody);
  blogId = result.body.id;
  expect(result.status).to.equal(200);
});

When("I GET all blogs", async () => {
  const result = await request.get("/api/blogs").set("Cookie", cookie).send();
  allBlogsResponse = result.body;
  expect(result.status).to.equal(200);
});

Then("I find the blog id of the created blog in the blogs response", () => {
  const blogIds:string[] = allBlogsResponse.map((blog) => {
      return blog.id
  })
  expect(blogIds).to.include(blogId);
});
