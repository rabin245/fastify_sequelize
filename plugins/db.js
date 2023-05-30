import fp from "fastify-plugin";
import Sequelize from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

import postModel from "../models/posts.js";
import userModel from "../models/users.js";

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
    const User = userModel(sequelize);

    User.hasMany(Post, { foreignKey: "userId" });
    Post.belongsTo(User, { foreignKey: "userId" });

    fastify.decorate("Post", Post);
    fastify.decorate("User", User);

    // Post.sync({ alter: true });
    // User.sync({ alter: true });
    Post.sync();
    User.sync();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
