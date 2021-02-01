const pool = require('./db').pool
const { v4: uuidv4 } = require('uuid');

const getBlogs = (_, response, next) => {
    pool.query('SELECT * FROM posts', (error, results) => {
        try {
            response.status(200).json(results.rows)
        } catch (e) {
            console.log(e);
        }
    })
}

const getBlogById = (request, response, next) => {
    pool.query(`SELECT * FROM posts 
        WHERE id = $1`, [request.params.id], (_, results) => {
        let response_data = {};
        response_data.post = results.rows[0];
        let type = results.rows[0].type;
        console.log(type);
        if (type == "text") {
            pool.query(`SELECT * FROM
            text_posts WHERE id = $1`, [request.params.id], (e, r) => {
                if (e) {
                    console.log(e)
                    return response.status(400).json({ "message": e })
                }
                response_data.additional_data = r.rows[0];
                return response.status(200).json(response_data);
            })
        }
        if (type == "images") {
            pool.query(`SELECT i.* FROM
            image_posts ip JOIN images i ON ip.image_id = i.id
            WHERE ip.id = $1`, [request.params.id], (e, r) => {
                if (e) {
                    console.log(e)
                    response.status(400).json({ "message": e })
                }
                response_data.additional_data = r.rows;
                return response.status(200).json(response_data);
            })
        }
    })
}

const createBlog = (request, response, next) => {

    const { title, content, longitude, latitude, type } = request.body
    console.log(request.body)
    const id = uuidv4()
    const timestamp = new Date().toISOString()

    pool.query(`INSERT INTO posts(id, title, type, longitude, latitude, "timestamp")
            VALUES ($1, $2, $3, $4, $5, $6)`, [id, title, type, longitude, latitude, timestamp],
        (error, _) => {
            if (error) {
                console.log(error)
                return response.status(400).json({ "message": error })
            }
            if (type == "text") {
                pool.query(`INSERT INTO 
            text_posts (id, content)
            VALUES ($1, $2)`, [id, content],
                    (error, _) => {
                        if (error) {
                            console.log(error)
                            return response.status(400).json({ "message": error })
                        }
                        return response.status(200).json({ "id": id })
                    })
            }

        })
}

const updateBlog = (request, response, next) => {
    const { title, content, longitude, latitude, type } = request.body
    const id = request.params.id
    pool.query(`UPDATE posts 
                SET title = $1,
                longitude = $2,
                latitude =  $3
                WHERE id = $4`, [title, longitude, latitude, id], (error, results) => {

        if (type == "text") {
            pool.query(`UPDATE text_posts SET content = $1 WHERE id = $2`, [content, id],
                (error, _) => {
                    if (error) {
                        console.log(error)
                        return response.status(400).json({ "message": error })
                    }
                    response.status(200).json({ "id": id })
                })
        }


    })
}


const deleteBlog = (request, respons, next) => {
    pool.query('DELETE FROM posts WHERE id = $1', [request.params.id], (error, _) => {
        if (error) {
            response.status(400).json({})
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