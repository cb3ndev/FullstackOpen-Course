const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  // Saving more than one blog in the database
  const noteObjects = helper.initialNotes
    .map(note => new Blog(note))
  // Promise.all is used to transform an array of promises into a single promise
  const promiseArray = noteObjects.map(note => note.save())
  await Promise.all(promiseArray)
  // use "const results = await Promise.all(promiseArray)" to get the resolved values for each promise
})

test('all blogs are returned', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialNotes.length)
})

test('verify id property in blog posts', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'post titulo test POST',
    author: 'el',
    url: 'www.4e.c',
    likes: 5,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialNotes.length + 1)
  const titles = blogsAtEnd.map(r => r.title)
  expect(titles).toContain('post titulo test POST')
})

test('blog without likes is added and likes will default to 0', async () => {
  const newBlog = {
    title: 'blog without likes',
    author: 'el',
    url: 'www.4e.c'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialNotes.length + 1)
  const likes = blogsAtEnd.map(r => r.likes)
  expect(likes).toContain(0)
})

test('blog without title or url is not added', async () => {
  const newBlogWithoutTitle = {
    author: 'el',
    url: 'www.4e.c',
    likes: 5,
  }
  const newBlogWithoutURL = {
    author: 'el',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(newBlogWithoutTitle)//.send(newBlogWithoutURL)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(newBlogWithoutURL)//.send(newBlogWithoutURL)
    .expect(400)
  const response = await api.get('/api/blogs')
  //const notesAtEnd = await helper.blogsInDb()
  expect(response.body).toHaveLength(helper.initialNotes.length)
})

// test('a specific blog can be viewed', async () => {
//   const blogAtstart = await helper.blogsInDb()

//   const blogToView = blogAtstart[0]

//   const resultBlog = await api
//     .get(`/api/blogs/${blogToView.id}`)
//     .expect(200)
//     .expect('Content-Type', /application\/json/)

//   const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

//   expect(resultBlog.body).toEqual(processedBlogToView)
// })


test('a blog can be deleted', async () => {
  const blogAtstart = await helper.blogsInDb()
  const blogToDelete = blogAtstart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialNotes.length - 1
  )

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.title)
})

test('a especific blog can be updated', async () => {
  const blogAtstart = await helper.blogsInDb()

  const newBlog = {
    title: 'new title updated',
    author: 'el',
    url: 'www.updated.com',
    likes: 54,
  }
  const blogToUpdate = blogAtstart[0]
  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()
  const titles = blogsAtEnd.map(r => r.title)
  expect(titles).toContain('new title updated')
  expect(blogsAtEnd).toHaveLength(helper.initialNotes.length)
})


afterAll(() => {
  mongoose.connection.close()
})