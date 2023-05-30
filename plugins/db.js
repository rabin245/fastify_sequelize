import fp from "fastify-plugin";
import Sequelize from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

import postModel from "../models/posts.js";

export default fp(async function (fastify, opts) {
  const sequelize = new Sequelize(
    process.env.PSQLDATABASE,
    process.env.PSQLUSER,
    process.env.PSQLPASSWORD,
    {
      host: process.env.PSQLHOST,
      dialect: "postgres",
    }
  );

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    const Post = postModel(sequelize);

    fastify.decorate("Post", Post);

    Post.sync({ alter: true });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
