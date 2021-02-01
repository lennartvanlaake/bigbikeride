const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const path = require('path');
const blogs = require('./backend/blogs')
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()
app.use(cors());
app.use(express.static('public'));

// Blog crud actions
app.get('/api/blogs', blogs.getBlogs);
app.get('/api/blogs/:id', blogs.getBlogById);
app.post('/api/blogs', jsonParser, blogs.createBlog)
app.put('/api/blogs/:id', jsonParser, blogs.updateBlog)
app.delete('/api/blogs/:id', blogs.deleteBlog)

// Send SPA landing page
app.get('*', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
   console.log(`Server is up at port ${port}`);
});
