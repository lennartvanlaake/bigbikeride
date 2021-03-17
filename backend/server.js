const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const blogs = require('./blogs');
const login = require('./login');
const images = require('./images');
const multer = require('multer');

const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()
app.use(cors());
app.use(express.static('public'));
app.use(session({secret: process.env.SESSION_SECRET, cookie: { maxAge: 9000000000000 }}))

// Blog crud actions
app.get('/api/blogs', blogs.getBlogs);
app.get('/api/blogs/:id', blogs.getBlogById);
app.post('/api/blogs', jsonParser, blogs.createBlog);
app.put('/api/blogs/:id', jsonParser, blogs.updateBlog);
app.delete('/api/blogs/:id', blogs.deleteBlog);


// uploads
var storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, 'public/')
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
    } 
 })
const upload = multer({ storage: storage })
app.post('/api/images', upload.single('filepond'), images.createImage);
app.post('/api/images/:id/post/:post', jsonParser, images.linkImageToPost);
app.put('/api/images/:id/description', jsonParser, images.updateImageDescription);

// login
app.post('/api/login', jsonParser, login.processLogin);
app.get('/api/login', login.isLoggedIn);

// Set upload dir
app.use('/public', express.static(__dirname + '/public'));

app.listen(port, () => {
   console.log(`Server is up at port ${port}`);
});
