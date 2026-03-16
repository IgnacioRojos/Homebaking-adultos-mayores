const accountService = require("../Services/accountService");

const getUserAccounts = async (req, res) => {
  try {
    const accounts = await accountService.getUserAccounts(req.user.id);
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};

const getAccountById = async (req, res) => {
  try {
    const account = await accountService.getAccountById(
      req.params.id,
      req.user.id
    );

    if (!account) {
      return res.status(404).json({ message: "Cuenta no encontrada" });
    }

    res.json(account);
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};


const createSavingsAccount = async (req, res) => {
  try {
    const { alias } = req.body;

    if (!alias) {
      return res.status(400).json({
        message: "El alias es obligatorio"
      });
    }

    const account = await accountService.createSavingsAccount(
      req.user.id,
      alias
    );

    res.status(201).json(account);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "El alias ya está en uso"
      });
    }

    res.status(500).json({ message: "Error del servidor" });
  }
};

const getPrimaryAccount = async (req, res) => {
  try {
    const account = await accountService.getPrimaryAccount(req.user.id);

    if (!account) {
      return res.status(404).json({
        message: "El usuario no tiene cuentas activas"
      });
    }

    res.json(account);
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};


const getBalance = async (req, res) => {
  try {
    const balance = await accountService.getBalance(
      req.params.id,
      req.user.id
    );

    if (balance === null) {
      return res.status(404).json({ message: "Cuenta no encontrada" });
    }

    res.json({ balance });
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};

const getLastMovements = async (req, res) => {
  try {
    const movements = await accountService.getLastMovements(
      req.params.id,
      req.user.id
    );

    if (!movements) {
      return res.status(404).json({ message: "Cuenta no encontrada" });
    }

    res.json(movements);
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};

const updateAccount = async (req, res) => {
  try {
    const updated = await accountService.updateAccount(
      req.params.id,
      req.user.id,
      req.body.isPrimary
    );

    if (!updated) {
      return res.status(404).json({ message: "Cuenta no encontrada" });
    }

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const deleted = await accountService.deleteAccount(
      req.params.id,
      req.user.id
    );

    if (!deleted) {
      return res.status(404).json({ message: "Cuenta no encontrada" });
    }

    res.json({ message: "Cuenta desactivada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};

module.exports = {
  getUserAccounts,
  getAccountById,
  getBalance,
  getLastMovements,
  updateAccount,
  deleteAccount,
  getPrimaryAccount,
  createSavingsAccount
};