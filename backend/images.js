const pool = require('./db').pool
const { v4: uuidv4 } = require('uuid');

const createImage = (request, response) => {
    const { post, description } = request.body

    if (!req.files) {
        res.status(400).send({
            message: 'No file uploaded'
        });
    } else {
        const id = uuidv4()
        const image = req.files.image;
        image.mv('./public/' + image.name);
        pool.query('INSERT INTO images (id, path, description) VALUES ($1, $2, $3)',
            [id, image.name, description], (error, results) => {
                if (error) {
                    console.log(error)
                    return response.status(400).json({ "message": error })
                }
                pool.query(`INSERT INTO image_posts(id, image_id) VALUES ($1, $2)`,
                    [post, id], (e, r) => {
                        if (e) {
                            console.log(e)
                            return response.status(400).json({ "message": e })
                        }
                    })
            })
        //send response
        res.send({
            message: 'File is uploaded',
        });
    }
}

module.exports = {
    createImage
}