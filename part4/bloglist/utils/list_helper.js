const dummy = (blogs) => {
  return Array.isArray(blogs)? 1 : 0
}

const totalLikes = (blogs) => {
  const totalBlogLikes = blogs.reduce(
    (initialValue, blog) => (initialValue + blog.likes)
    , 0)
  return totalBlogLikes
}

const favoriteBlog = (blogs) => {
  const blogWithMostLikes = blogs.reduce(
    (prev, current) => {
      return prev.likes > current.likes ? prev : current
    }
    , {})
  return blogWithMostLikes
}

const mostBlogs = (blogs) => {
  if (blogs.length===0) return {}
  const authorsAndBlogs = []
  blogs.forEach((blog) => {
    if(authorsAndBlogs.some((val) => { return val['author'] === blog['author'] })){
      authorsAndBlogs.forEach((k) => {
        if(k['author'] === blog['author']){
          k['blogs']++
        }
      })

    }else{
      let aux = {}
      aux['author'] = blog['author']
      aux['blogs'] = 1
      authorsAndBlogs.push(aux)
    }
  })

  const authorWithMostBlogs = authorsAndBlogs.reduce(
    (prev, current) => {
      return prev.blogs > current.blogs ? prev : current
    })

  return authorWithMostBlogs
}

const mostLikes = (blogs) => {
  if (blogs.length===0) return {}
  const authorsAndLikes = []
  blogs.forEach((blog) => {
    if(authorsAndLikes.some((val) => { return val['author'] === blog['author'] })){
      authorsAndLikes.forEach((k) => {
        if(k['author'] === blog['author']){
          k['likes']=k['likes']+blog['likes']
        }
      })

    }else{
      let aux = {}
      aux['author'] = blog['author']
      aux['likes'] = blog['likes']
      authorsAndLikes.push(aux)
    }
  })
  const authorWithMostLikes = authorsAndLikes.reduce(
    (prev, current) => {
      return prev.likes > current.likes ? prev : current
    })

  return authorWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}