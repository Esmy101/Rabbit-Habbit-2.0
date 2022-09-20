const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Posts extends Model {}

Posts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    post_context: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    post_title: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
  },
  {
    hooks: {},
    sequelize,
    createdAt: "post_date",
    updatedAt: false,
    freezeTableName: true,
    underscored: true,
    modelName: "posts",
  }
);

module.exports = Posts;
