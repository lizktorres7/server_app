const Role = require("../models/role.models");
const User = require("../models/user.models");

const isRoleValid = async (role = "") => {
  const existsRole = await Role.findOne({ where: { role } });
  if (role && !existsRole) {
    throw new Error("No es un rol permitido");
  }
};

const emailExists = async (email = "") => {
  const existEmail = await User.findOne({ where: { email } });
  if (existEmail) {
    throw new Error(`El correo ${email} ya existe`);
  }
};

const existsUserForId = async (id) => {
  const existsUsers = await User.findByPk(uid);
  if (!existsUsers) {
    throw new Error(`The id does not exist ${id}`);
  }
};

module.exports = {
  isRoleValid,
  emailExists,
  existsUserForId,
};
