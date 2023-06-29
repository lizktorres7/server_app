const { DataTypes } = require("sequelize");

const { sequelize } = require("./../database/conf");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.ENUM("ADMIN", "USER"),
    allowNull: false,
  },
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  google: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;
