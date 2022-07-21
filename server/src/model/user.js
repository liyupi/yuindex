const { DataTypes } = require("sequelize");
const sequelize = require("../db");

/**
 * 用户模型
 * @author yupi
 */
const UserModel = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    createTime: {
      type: DataTypes.DATE,
    },
    updateTime: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "user",
    paranoid: true,
    deletedAt: "isDelete",
    timestamps: false,
  }
);

module.exports = UserModel;
