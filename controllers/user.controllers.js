const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user.models");

const userGet = async (req = request, res = response) => {
  const { limit = 1000, offset = 0 } = req.query;
  const query = { state: true };
  try {
    const [length, user] = await Promise.all([
      User.count({ where: query }),
      User.findAll({
        where: query,
        offset: Number(offset),
        limit: Number(limit),
      }),
    ]);
    res.json({ length, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const userPost = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;

  //Encriptar la contrasenna
  const salt = bcryptjs.genSaltSync();
  _password = bcryptjs.hashSync(password, salt);

  try {
    const user = await User.create({
      name,
      email,
      password: _password,
      role,
    });
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const usersPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, state, ...resto } = req.body;

  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  await User.update(resto, {
    where: {
      id,
    },
  });

  res.json({ msg: "Usuario actualizado correctamente" });
};

const usersDelete = async (req, res = response) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, { state: false });

  res.json({ user });
};

module.exports = {
  userGet,
  userPost,
  usersPut,
  usersDelete,
};
