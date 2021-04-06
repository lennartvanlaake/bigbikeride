
// @ts-ignore
import { Given, When, Then, AfterAll, After, World } from 'cucumber'
import axios from 'axios'
import { expect } from 'chai'

let sessionConfig: any;

Given('I am logged in', async () => {
    let result = await axios.post("http://localhost:5000/api/login", { password: "password" })
    console.log("headers:" + result.headers['set-cookie'])

    sessionConfig = {
        headers: {
            Cookie: `${result.headers['set-cookie']}`
        }
    }
    expect(result.status).to.equal(200)
});

Given('I POST a blog with body', async (body: any) => {
    let result = await axios.post("http://localhost:5000/api/blogs", body, sessionConfig)
    expect(result.status).to.equal(200)
})