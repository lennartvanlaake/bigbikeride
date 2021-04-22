
// @ts-ignore
import { Given, When, Then, AfterAll, After, World } from '@cucumber/cucumber'
import { expect } from 'chai'
import { app } from './server'
import supertest from 'supertest'
import { CreateBlogRequest } from '../types/types'

let cookie: string
let server = app.listen();
let request = supertest(server);

Given('I am logged in', async () => {
    const result = await request
        .post('/api/login')
        .send({ password: "password" })
    cookie = result.headers['set-cookie']
    expect(result.status).to.equal(200)
});

Given('I POST a blog with title {string}', async (title: string) => {
    const requestBody: CreateBlogRequest = {
        title: title,
        type: "text",
        content: "",
        coordinates: {
            long: 0.0,
            lat: 0.0
        }
    }
    const result = await request
    .post('/api/blogs')
    .set("Cookie", cookie)
    .send(requestBody)
    expect(result.status).to.equal(200)
})

When('I GET all blogs', async () => {
    const result = await request
    .get('/api/blogs')
    .set("Cookie", cookie)
    .send()
    expect(result.status).to.equal(200)
})

