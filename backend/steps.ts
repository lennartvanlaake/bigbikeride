
// @ts-ignore
import { Given, When, Then, AfterAll, After, World } from '@cucumber/cucumber'
import { expect } from 'chai'
import { app } from './server'
import supertest from 'supertest'

let sessionConfig: any
let server = app.listen();
let request = supertest(server);

Given('I am logged in', async () => {
    const result = await request
        .post('/api/login')
        .send({ password: "password" })

    sessionConfig = {
        headers: {
            Cookie: `${result.headers['set-cookie']}`
        }
    }
    expect(result.status).to.equal(200)
});

Given('I POST a blog with body', async (body: any) => {
    console.log(sessionConfig)
    console.log(body)
    // let result = await axios.post("http://localhost:5000/blogs", body, sessionConfig)
    // expect(result.status).to.equal(200)
})

