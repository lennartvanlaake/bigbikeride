const pool = require('./db').pool
const { v4: uuidv4 } = require('uuid');

const getBlogs = (_, response) => {
    pool.query('SELECT * FROM blogs', (error, results) => {
        if (error) {
            console.log(error)
        }
        response.status(200).json(results.rows)
    })
}

const getBlogById = (request, response) => {

    pool.query('SELECT * FROM blogs WHERE id = $1', [request.params.id], (error, results) => {
        if (error) {
            console.log(error)
        }
        response.status(200).json(results.rows[0])
    })

}

const createBlog = (request, response) => {

    const { title, content, longitude, latitude } = request.body
    console.log(request.body)
    const id = uuidv4()
    const timestamp = new Date().toISOString()

    pool.query(`INSERT INTO 
            blogs (id, title, content, longitude, latitude, timestamp)
            VALUES ($1, $2, $3, $4, $5, $6)`, [id, title, content, longitude, latitude, timestamp],
            (error, _) => {
        if (error) {
            response.status(400).json({ "error": error })
        } else {
            response.status(200).json({ "id": id })
        } 
    })

}

const updateBlog = (request, response) => {
    const { title, content, longitude, latitude } = request.body
    const id = request.params.id
    pool.query(`UPDATE blogs 
                SET title = $1,
                content = $2,
                longitude = $3,
                latitude = $4
                WHERE id = $5`, [title, content, longitude, latitude, id], (error, results) => {
        if (error) {
            console.log(error)
            response.status(400).json({ "error": error })
        } else {
            response.status(200).json({ "id": id })
        } 
    })
}


const deleteBlog = (request, response) => {
    pool.query('DELETE FROM blogs WHERE id = $1', [request.params.id], (error, _) => {
        if (error) {
            response.status(400).json({ "message": error })
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