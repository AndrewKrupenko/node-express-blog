const Blog = require("../modules/blog");

const index = (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('blogs/index', { title: 'All Blogs', blogs: result }); // 'blogs/' also for fun
    })
    .catch(err => console.log(err));
}

const show = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('blogs/details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      res.status(404).render('404', { title: 'Blog is not found' });
    });
}

const create = (req, res) => {
  res.render('blogs/create', { title: 'Create a new Blog' });
}

const store = (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch(err => console.log(err));
}

const destroy = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      console.log('result', result);
      res.json({ redirect: '/blogs' });
    })
    .catch(err => console.log(err));
}

module.exports = {
  index,
  show,
  create,
  store,
  destroy,
}

