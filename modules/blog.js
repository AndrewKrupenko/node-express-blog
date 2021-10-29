const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Schema is going to define the structure of the documents we gonna store inside collections

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  }
}, { timestamps: true }); // generate created_at and updated_at inside collection

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;