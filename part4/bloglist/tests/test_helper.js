const Blog = require('../models/blog')

const initialNotes = [
  { title: 'post titulo',
    author: 'yo',
    url: 'www.e.c',
    likes: 12,
  },
  {
    title: 'post titulo 2',
    author: 'yoo',
    url: 'www.ew.c',
    likes: 1,
  },]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: '.',
    url: '.',
    likes: 1,
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialNotes, nonExistingId, blogsInDb
}