const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

let token = ''
beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  console.log('cleared')
  //login and creating token for testing
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = await new User({ username: 'root', passwordHash }).save()

  const userForToken = { username: user.username, id: user.id }
  token = jwt.sign(userForToken, process.env.SECRET)

  const initialBlog = {
    title: 'post titulo 2',
    author: 'yoo',
    url: 'www.ew.c',
    likes: 1,
  }

  await api.post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(initialBlog)

  return (token)
})

test('all blogs are returned', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(1)
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
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(2)
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
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(2)
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
    .set('Authorization', `Bearer ${token}`)
    .send(newBlogWithoutTitle)//.send(newBlogWithoutURL)
    .expect(400)

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlogWithoutURL)//.send(newBlogWithoutURL)
    .expect(400)
  const response = await api.get('/api/blogs')
  //const notesAtEnd = await helper.blogsInDb()
  expect(response.body).toHaveLength(1)
})

test('a blog can be deleted', async () => {
  const blogAtstart = await helper.blogsInDb()
  const blogToDelete = blogAtstart[0]
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    0
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
    likes: 51,
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
  expect(blogsAtEnd).toHaveLength(1)
})

test('blog creation fails if token is not provided', async () => {
  const usersAtStart = await helper.usersInDb()

  const newBlog = {
    title: 'post sssdOST',
    author: 'ella',
    url: 'www.e.c',
    likes: 55,
  }
  const result = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('invalid or missing token')

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toEqual(usersAtStart)
})


afterAll(() => {
  mongoose.connection.close()
})