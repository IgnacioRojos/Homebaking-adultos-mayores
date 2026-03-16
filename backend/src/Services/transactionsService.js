const Transaction = require("../models/Transactions");
const Account = require("../models/Account");
const Card = require("../models/Card");

// ===============================
// DEPOSITO
// ===============================

const deposit = async (userId, accountId, amount) => {

  const account = await Account.findOne({
    _id: accountId,
    user: userId
  });

  if (!account) throw new Error("Cuenta no encontrada");

  account.balance += amount;
  await account.save();

  const transaction = await Transaction.create({
    user: userId,
    account: accountId,
    type: "DEPOSIT",
    amount,
    description: "Depósito en cuenta"
  });

  return transaction;
};


// ===============================
// TRANSFERENCIA
// ===============================

const transfer = async (userId, fromAccountId, toAccountId, amount) => {

  const fromAccount = await Account.findOne({
    _id: fromAccountId,
    user: userId
  });

  if (!fromAccount) throw new Error("Cuenta origen no encontrada");

  const toAccount = await Account.findById(toAccountId);

  if (!toAccount) throw new Error("Cuenta destino no encontrada");

  if (fromAccount.balance < amount) {
    throw new Error("Saldo insuficiente");
  }

  fromAccount.balance -= amount;
  toAccount.balance += amount;

  await fromAccount.save();
  await toAccount.save();

  const transaction = await Transaction.create({
    user: userId,
    account: fromAccountId,
    type: "TRANSFER",
    amount,
    description: "Transferencia realizada"
  });

  return transaction;
};


// ===============================
// COMPRA CON TARJETA
// ===============================

const cardPurchase = async (userId, cardId, amount, description) => {

  const card = await Card.findOne({
    _id: cardId,
    user: userId
  });

  if (!card) throw new Error("Tarjeta no encontrada");

  // ===============================
  // TARJETA DE CREDITO
  // ===============================
  if (card.type.toLowerCase() === "credit") {

    if (card.availableLimit < amount) {
      throw new Error("Límite insuficiente");
    }

    card.availableLimit -= amount;

    await card.save();
  }

  // ===============================
  // TARJETA DE DEBITO
  // ===============================
  if (card.type.toLowerCase() === "debit") {

    const account = await Account.findById(card.account);

    if (!account) throw new Error("Cuenta no encontrada");

    if (account.balance < amount) {
      throw new Error("Fondos insuficientes");
    }

    account.balance -= amount;

    await account.save();
  }

  const transaction = await Transaction.create({
    user: userId,
    account: card.account,
    card: cardId,
    type: "CARD_PURCHASE",
    amount,
    description,
    status: "COMPLETED"
  });

  return transaction;
};


// ===============================
// HISTORIAL DE TRANSACCIONES
// ===============================

const getUserTransactions = async (userId, page = 1, limit = 10, type) => {

  const skip = (page - 1) * limit;

  let filter = { user: userId };

  if (type) {
    filter.type = type;
  }

  const transactions = await Transaction.find(filter)
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Transaction.countDocuments(filter);

  return {
    total,
    page,
    pages: Math.ceil(total / limit),
    transactions
  };
};

module.exports = {
  deposit,
  transfer,
  cardPurchase,
  getUserTransactions
};