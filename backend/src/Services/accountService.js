const Account = require("../models/Account");
const Movement = require("../models/Movement");

const getUserAccounts = async (userId) => {
  return await Account.find({ user: userId, isActive: true });
};

const getAccountById = async (accountId, userId) => {
  return await Account.findOne({
    _id: accountId,
    user: userId,
    isActive: true
  });
};

const getBalance = async (accountId, userId) => {
  const account = await Account.findOne({
    _id: accountId,
    user: userId,
    isActive: true
  });

  if (!account) return null;

  return account.balance;
};

const getPrimaryAccount = async (userId) => {
  // Buscar principal activa
  let primaryAccount = await Account.findOne({
    user: userId,
    isPrimary: true,
    isActive: true
  });

  if (primaryAccount) return primaryAccount;

  // Si no hay principal, buscar cualquier cuenta activa
  const anyAccount = await Account.findOne({
    user: userId,
    isActive: true
  });

  if (!anyAccount) return null;

  // Asignarla como principal automáticamente
  anyAccount.isPrimary = true;
  await anyAccount.save();

  return anyAccount;
};


const generateCBU = () => {
  return Math.floor(1000000000000000000000 + Math.random() * 9000000000000000000000).toString();
};

const createSavingsAccount = async (userId, alias) => {
  const activeAccounts = await Account.find({
    user: userId,
    isActive: true
  });

  const isFirstAccount = activeAccounts.length === 0;

  const newAccount = new Account({
    user: userId,
    cbu: generateCBU(),
    alias,
    type: "caja_ahorro",
    balance: 0,
    isPrimary: isFirstAccount
  });

  await newAccount.save();

  return newAccount;
};

const getLastMovements = async (accountId, userId) => {
  const account = await Account.exists({
    _id: accountId,
    user: userId,
    isActive: true
  });

  if (!account) return null;

  return await Movement.find({ account: accountId })
    .sort({ createdAt: -1 })
    .limit(10);
};

const updateAccount = async (accountId, userId, isPrimary) => {

  const account = await Account.findOne({
    _id: accountId,
    user: userId,
    isActive: true
  });

  if (!account) return null;

  // solo si quieren hacerla primaria
  if (isPrimary === true) {

    // quitar principal a todas las cuentas del usuario
    await Account.updateMany(
      { user: userId },
      { $set: { isPrimary: false } }
    );

    // asignar la nueva principal
    account.isPrimary = true;
  }

  await account.save();

  return account;
};

const deleteAccount = async (accountId, userId) => {
  const account = await Account.findOne({
    _id: accountId,
    user: userId,
    isActive: true
  });

  if (!account) return null;

  const wasPrimary = account.isPrimary;

  // Desactivar cuenta
  account.isActive = false;
  account.isPrimary = false;
  await account.save();

  // Si era principal, asignamos otra
  if (wasPrimary) {
    const anotherAccount = await Account.findOne({
      user: userId,
      isActive: true
    });

    if (anotherAccount) {
      anotherAccount.isPrimary = true;
      await anotherAccount.save();
    }
  }

  return account;
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