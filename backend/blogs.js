const pool = require('./db').pool
const { v4: uuidv4 } = require('uuid');

const getBlogs = (_, response) => {
    pool.query('SELECT * FROM blogs', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getBlogById = (request, response) => {

    pool.query('SELECT * FROM blogs WHERE id = $1', [request.params.id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })

}

const createBlog = (request, response) => {

    const { title } = request.body
    const id = uuidv4()
    const timestamp = new Date().toISOString()

    pool.query('INSERT INTO blogs (id, title, timestamp) VALUES ($1, $2, $3)', [id, title, timestamp], (error, _) => {
        if (error) {
            throw error
        }
    })
    response.status(200).json({ "id": id })

}

const updateBlog = (request, response) => {
    const { title } = request.body
    pool.query('UPDATE blogs SET title = $1 WHERE id = $2', [title, request.params.id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json({ "id": request.params.id })
    })
}


const deleteBlog = (request, response) => {
    pool.query('DELETE FROM blogs WHERE id = $1', [request.params.id], (error, _) => {
        if (error) {
            throw error
        }
        response.status(200).json({ "id": request.params.id })
    })
}

module.exports = {
    getBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
}