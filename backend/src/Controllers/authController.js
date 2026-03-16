const authService = require("../Services/authService");

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

module.exports = {
  login,
  register
};