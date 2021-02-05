const pool = require('./db').pool
const { v4: uuidv4 } = require('uuid');


const createImage = (req, res) => {
    const { post, description } = req.body
    console.log(req.file)
    if (!req.file) {
        res.status(400).send({
            message: 'No file uploaded'
        });
    } else {
        const id = uuidv4();
        pool.query('INSERT INTO images (id, path, description) VALUES ($1, $2, $3)',
            [id, req.path, description], (error, results) => {
                if (error) {
                    console.log(error)
                    return res.status(400).json({ "message": error })
                }
                pool.query(`INSERT INTO image_posts(id, image_id) VALUES ($1, $2)`,
                    [post, id], (e, r) => {
                        if (e) {
                            console.log(e)
                            return res.status(400).json({ "message": e })
                        }
                    })
            })
        //send response
        res.type('text/plain')
        res.send(id);
    }
}

module.exports = {
    createImage
}