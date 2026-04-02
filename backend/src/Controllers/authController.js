const authService = require("../Services/authService");
const User = require("../models/Users");

const login = async (req, res) => {
  try {
    const { dni, password } = req.body;

    if (!dni || !password) {
      return res.status(400).json({
        message: "DNI y contraseña son obligatorios"
      });
    }

    const data = await authService.login(dni, password);

    res.status(200).json({
      message: "Login exitoso",
      ...data
    });
  } catch (error) {
    res.status(401).json({
      message: error.message
    });
  }
};

const register = async (req, res) => {
  try {
    const { fullName, dni, email, password } = req.body;

    if (!fullName || !dni || !email || !password) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios"
      });
    }

    const data = await authService.register({
      fullName,
      dni,
      email,
      password
    });

    res.status(201).json({
      message: "Usuario creado correctamente",
      ...data
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};


const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); 

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};


const updateEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const updatedUser = await authService.updateUserEmail(req.userId, email);

    res.json({
      message: "Email actualizado correctamente",
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  login,
  register,
  getMe,
  updateEmail
};