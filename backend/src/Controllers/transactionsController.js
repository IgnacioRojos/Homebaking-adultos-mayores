const transactionService = require("../Services/transactionsService");


// ===============================
// DEPOSITO
// ===============================

const deposit = async (req, res) => {
  try {

    const { accountId, amount } = req.body;

    const transaction = await transactionService.deposit(
      req.user.id,
      accountId,
      amount
    );

    res.status(201).json(transaction);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// ===============================
// TRANSFERENCIA
// ===============================

const transfer = async (req, res) => {
  try {

    const { fromAccountId, toAccountId, amount } = req.body;

    const transaction = await transactionService.transfer(
      req.user.id,
      fromAccountId,
      toAccountId,
      amount
    );

    res.status(201).json(transaction);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// ===============================
// COMPRA CON TARJETA
// ===============================

const cardPurchase = async (req, res) => {
  try {

    const { cardId, amount, description } = req.body;

    const transaction = await transactionService.cardPurchase(
      req.user.id,
      cardId,
      amount,
      description
    );

    res.status(201).json(transaction);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// ===============================
// HISTORIAL
// ===============================

const getUserTransactions = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await transactionService.getUserTransactions(
      req.user.id,
      page,
      limit
    );

    res.json(result);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  deposit,
  transfer,
  cardPurchase,
  getUserTransactions
};