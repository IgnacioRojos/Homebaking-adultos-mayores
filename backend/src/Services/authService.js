const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const login = async (dni, password) => {
  const user = await User.findOne({ dni });

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  if (!user.isActive) {
    throw new Error("Usuario deshabilitado");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Contraseña incorrecta");
  }

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      dni: user.dni,
      email: user.email
    }
  };
};

const register = async ({ fullName, dni, email, password }) => {
  const existingDni = await User.findOne({ dni });
  if (existingDni) {
    throw new Error("Ya existe un usuario con ese DNI");
  }

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new Error("El email ya está registrado");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    fullName,
    dni,
    email,
    password: hashedPassword
  });

  const token = generateToken(newUser);

  return {
    token,
    user: {
      id: newUser._id,
      fullName: newUser.fullName,
      dni: newUser.dni,
      email: newUser.email
    }
  };
};

module.exports = {
  login,
  register
};