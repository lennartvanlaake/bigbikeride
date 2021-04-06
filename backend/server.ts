import express = require('express');
// @ts-ignore
import cors = require('cors');
import { sequelize } from './db';
import { getBlogById, getBlogs, createBlog } from './blogs';
import { checkLogin, processLogin, isLoggedIn } from './login';

// import path from 'path';
// import login from './login';
// import images from './images';
// import multer from 'multer';
sequelize.sync();
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(checkLogin)
app.use(express.json());
app.use(express.static('public'));

// Blog crud actions
app.get('/api/blogs', getBlogs);
app.get('/api/blogs/:id', getBlogById);
app.post('/api/blogs', createBlog);
// app.put('/api/blogs/:id', jsonParser, blogs.updateBlog);
// app.delete('/api/blogs/:id', blogs.deleteBlog);


// // uploads
// var storage = multer.diskStorage({
//    destination: function (req, file, cb) {
//      cb(null, 'public/')
//    },
//    filename: function (req, file, cb) {
//       cb(null, Date.now() + path.extname(file.originalname))
//     } 
//  })
// const upload = multer({ storage: storage })
// app.post('/api/images', upload.single('filepond'), images.createImage);
// app.post('/api/images/:id/post/:post', jsonParser, images.linkImageToPost);
// app.put('/api/images/:id/description', jsonParser, images.updateImageDescription);

// login
app.post('/api/login', processLogin);
app.get('/api/login', isLoggedIn);

// Set upload dir
app.use('/public', express.static(__dirname + '/public'));

app.listen(port, () => {
   console.log(`Server is up at port ${port}`);
});
