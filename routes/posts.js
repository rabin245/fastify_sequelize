import postsHandler from '../controllers/handlers/postsHandler.js'
import postsSchema from '../controllers/schemas/postsSchema.js'

const getPostsOption = {
  schema: postsSchema.getPosts,
  handler: postsHandler.getPosts
}

const getPostsByIdOption = {
  schema: postsSchema.getPostById,
  handler: postsHandler.getPostById
}

const createPostOption = {
  schema: postsSchema.createPost,
  handler: postsHandler.createPost,
}

const deletePostOption = {
  schema: postsSchema.deletePost,
  handler: postsHandler.deletePost,
}

const updatePostOption = {
  schema: postsSchema.updatePost,
  handler: postsHandler.updatePost,
}

export default async function (fastify, opts) {
  fastify.get('/posts', getPostsOption )

  fastify.get('/posts/:id', getPostsByIdOption)

  fastify.post('/posts', createPostOption)

  fastify.delete('/posts/:id', deletePostOption)

  fastify.put('/posts/:id', updatePostOption)
}
