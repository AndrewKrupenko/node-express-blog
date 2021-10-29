const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const app = express();

const dbURL = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@node-blog-cluster.bx2vg.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch(err => console.log(err));

// register view engine (ejs)
app.set('view engine', 'ejs'); // default folder is /views. To change we can also set app.set('views', 'myviews')

app.use(express.static('public')); // said that static folder is a public one (after that I can reach for example for style.css file)
app.use(express.urlencoded({ extended: true })); // middleware takes all request data and passes it into request object (currently for post method /blogs -> req.body)

app.get('/', (req, res) => { // just doing it for fun
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// we create middleware. If we reach to this code it will fire every time (from top to the bottom). This should be placed at the bottom
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});