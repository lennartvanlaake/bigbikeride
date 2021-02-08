const query = require('./db').safeQuery
const { v4: uuidv4 } = require('uuid');


const createImage = (req, res) => {
    const { post, description } = req.body
    if (!req.file) {
        res.status(400).send({
            message: 'No file uploaded'
        });
    } else {
        const id = uuidv4();
        safeQuery('INSERT INTO images (id, path, description) VALUES ($1, $2, $3)',
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
                        res.type('text/plain')
                        res.send(id);
                    })
            })
        //send response

    }
}

module.exports = {
    createImage
}