const postSchema = {
  type: "object",
  properties: {
    id: { type: "number"},
    title: { type: "string" },
    content: { type: "string" },
  }
}

const idParamSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: { type: "number" },
  },
}

export default {
  getPosts : {
    response: {
        200: {
        type: "array",
        items: postSchema,
      }
    }
  },
  getPostById: {
    params: idParamSchema,
    response: {
      200: postSchema,
    }
  },
  createPost: {
    body: {
      type: "object",
      required: ["title"],
      properties: {
        title: { type: "string" },
        content: { type: "string" },
      }
    },
    response: {
      200: postSchema,
    }
  },
  deletePost: {
    params: idParamSchema,
    response: {
      200: postSchema,
    }
  },
  updatePost: {
    params: idParamSchema,
    body: postSchema,
    response: {
      200: postSchema,
    }
  }
}

