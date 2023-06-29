const { DataTypes } = require("sequelize");

const { sequelize } = require("./../database/conf");

const Role = sequelize.define("roles", {
  role: {
    type: DataTypes.STRING,
  },
});

module.exports = Role;
