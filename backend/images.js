const safeQuery = require('./db').safeQuery
const { v4: uuidv4 } = require('uuid');


const createImage = (request, response) => {
    if (!request.file) {
        response.status(400).send({
            message: 'No file uploaded'
        });
    } else {
        const id = uuidv4();
        return safeQuery(response, 'INSERT INTO images (id, path) VALUES ($1, $2)',
            [id, request.file.path], (_) => {
                response.type('text/plain')
                response.send(id);
            })
    }
}

const linkImageToPost = (request, response) => {
    return safeQuery(response, `INSERT INTO image_posts(post_id, image_id) VALUES ($1, $2)`,
    [request.params.post, request.params.id], (_) => { 
        return response.status(200).json({ "message": "OK" })
    })
}

const updateImageDescription = (request, response) => {
    const description = request.body.description
    return safeQuery(res, `UPDATE images SET description = $1 WHERE id = $2`,
    [description, request.params.id], (_) => {
        return response.status(200).json({ "message": "OK" })
    })
}

module.exports = {
    createImage,
    linkImageToPost,
    updateImageDescription
}