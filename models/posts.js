import { DataTypes } from "sequelize";

const postModel = (sequelize) => {
  return sequelize.define("posts", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: DataTypes.TEXT,
  });
};

export default postModel;
