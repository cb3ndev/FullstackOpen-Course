/* eslint-disable quotes */
const listHelper = require('../utils/list_helper')

//lists of blogs for testing
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]
const listWithNoBlog=[]
const listBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 11,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 3,
    __v: 0
  }
]

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('totalLikes', () => {

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(listWithNoBlog)
    expect(result).toBe(0)
  })
  test('of a bigger list is calculated rigth', () => {
    const result = listHelper.totalLikes(listBlogs)
    expect(result).toBe(33)
  })
})

describe('blog with most likes', () => {

  test('when list has only one blog, equals that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual({
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    })
  })
  test('of empty list is empty object', () => {
    const result = listHelper.favoriteBlog(listWithNoBlog)
    expect(result).toEqual({})
  })
  test('of a bigger list is calculated rigth', () => {
    const result = listHelper.favoriteBlog(listBlogs)
    expect(result).toEqual({
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 12,
      __v: 0
    })
  })
})

describe('author with most blogs', () => {

  test("when list has only one blog, equals that blog's author with one blog", () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })
  test('of empty list is empty object', () => {
    const result = listHelper.mostBlogs(listWithNoBlog)
    expect(result).toEqual({})
  })
  test('of a bigger list is calculated rigth', () => {
    const result = listHelper.mostBlogs(listBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 2
    })
  })
})

describe('author with most likes', () => {

  test("when list has only one blog, equals that blog's author and likes", () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })
  test('of empty list is empty object', () => {
    const result = listHelper.mostLikes(listWithNoBlog)
    expect(result).toEqual({})
  })
  test('of a bigger list is calculated rigth', () => {
    const result = listHelper.mostLikes(listBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 23
    })
  })
})