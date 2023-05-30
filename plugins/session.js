import fastifyPlugin from "fastify-plugin";
import fastifySession from "@fastify/session";
import fastifyCookie from "@fastify/cookie";

async function session(fastify, opts) {
  fastify.register(fastifyCookie);
  fastify.register(fastifySession, {
    cookieName: "sessionId",
    secret: "a secret with minimum length of 32 characters",
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 60 * 1000,
      expires: Date.now() + 60 * 1000,
    },
    saveUninitialized: false,   // don't create session until something stored
  });

  fastify.decorate("authenticate", async function (request, reply, done) {
    try {
      if (!request.session.userId) {
        console.log("\n\n\nhere i am hello world \n\n\n");
        throw new Error("klsdjflsjdklfjsdlfjlsdfj");
      }
      const User = request.server.User;
      const user = await User.findByPk(request.session.userId);
      console.log(request.session.userId);

      if (!user) throw new Error("No user logged in");

      request.user = user;

      return;
    } catch (error) {
      console.log(error.message);

      if (error.message === "No user logged in")
        reply.code(401).send({ error: "Unauthorized" });
      else
        reply.code(500).send({
          error: "Internal Server Error",
          msg: error.message,
        });
    }
  });
}

export default fastifyPlugin(session);
