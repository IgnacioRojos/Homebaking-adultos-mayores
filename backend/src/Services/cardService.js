const Card = require("../models/Card");
const Transaction = require("../models/Transactions");
const Account = require("../models/Account");
const mongoose = require("mongoose");


// ===============================
// PEDIR TARJETA
// ===============================

const requestCard = async (userId, type, accountId) => {

  const cardNumber =
    Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString();

  const cardData = {
    user: userId,
    account: accountId,
    cardNumber,
    type: type.toLowerCase()
  };

  if (type.toLowerCase() === "credit") {
    cardData.creditLimit = 500000;
    cardData.availableLimit = 500000;
  }

  const card = await Card.create(cardData);

  return card;
};

// ===============================
// MOSTRAR TARJETAS
// ===============================

const getUserCards = async (userId) => {

  const cards = await Card.find({
    user: new mongoose.Types.ObjectId(userId)
  });

  return cards.map(card => ({
    id: card._id,
    type: card.type,
    lastFour: card.number.slice(-4)
  }));
};


// ===============================
// VER DETALLES DE TARJETA
// ===============================

const getCardDetails = async (cardId, userId) => {

  const card = await Card.findOne({
    _id: cardId,
    user: userId
  });

  if (!card) throw new Error("Tarjeta no encontrada");

  const lastFour = card.cardNumber.slice(-4);

  const fakeNumber = "4500 1234 5678 " + lastFour;

  const cvv = Math.floor(100 + Math.random() * 900);


  const balanceData = await getCardBalance(cardId, userId);
  const dates = await getClosingDates(cardId, userId);

  const movements = await getMovements(cardId);
  const lastPayment = await getLastPayment(cardId);
  const debtData = await getAmountToPay(cardId);

  return {
    number: fakeNumber,
    cvv,
    type: card.type,
    status: card.status,

    // balance
    ...balanceData,

    // fechas
    closingDate: dates.closingDate,
    dueDate: dates.dueDate,

    movements,
    lastPayment,
    totalPurchases: debtData.totalPurchases,
    totalPayments: debtData.totalPayments,
    amountToPay: debtData.amountToPay
  };
};


// ===============================
// HABILITAR TARJETA
// ===============================

const enableCard = async (cardId, userId) => {

  const card = await Card.findOne({
    _id: cardId,
    user: userId
  });

  if (!card) {
    throw new Error("Tarjeta no encontrada");
  }

  // tarjeta cancelada no puede volver a activarse
  if (card.status === "cancelled") {
    throw new Error("Una tarjeta cancelada no puede habilitarse nuevamente");
  }

  // tarjeta bloqueada no puede habilitarse desde aquí
  if (card.status === "blocked") {
    throw new Error("La tarjeta está bloqueada y debe ser desbloqueada por el banco");
  }

  // ya activa
  if (card.status === "active") {
    throw new Error("La tarjeta ya está habilitada");
  }

  card.status = "active";
  await card.save();

  return card;
};


// ===============================
// RESUMEN TARJETA CREDITO
// ===============================

const getStatement = async (cardId, userId) => {

  const card = await Card.findOne({
    _id: cardId,
    user: userId,
    type: "CREDIT"
  });

  if (!card) throw new Error("Tarjeta de crédito no encontrada");

  const purchases = await Transaction.find({
    card: cardId,
    type: "CARD_PURCHASE"
  }).sort({ date: -1 });

  return {
    message: "Tu resumen se está generando",
    purchases
  };
};


// ===============================
// CUANTO TIENE QUE PAGAR
// ===============================

const getAmountToPay = async (cardId) => {

  const purchases = await Transaction.aggregate([
    {
      $match: {
        card: new mongoose.Types.ObjectId(cardId),
        type: "CARD_PURCHASE"
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" }
      }
    }
  ]);

  const payments = await Transaction.aggregate([
    {
      $match: {
        card: new mongoose.Types.ObjectId(cardId),
        type: "CARD_PAYMENT"
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" }
      }
    }
  ]);

  const totalPurchases = purchases[0]?.total || 0;
  const totalPayments = payments[0]?.total || 0;

  return {
    totalPurchases,
    totalPayments,
    amountToPay: totalPurchases - totalPayments
  };
};


// ===============================
// ULTIMO PAGO
// ===============================

const getLastPayment = async (cardId) => {

  const payment = await Transaction.findOne({
    card: cardId,
    type: "CARD_PAYMENT"
  }).sort({ date: -1 });

  return payment;
};


// ===============================
// ULTIMOS MOVIMIENTOS
// ===============================

const getMovements = async (cardId) => {

  const movements = await Transaction.find({
    card: cardId
  })
    .sort({ date: -1 })
    .limit(10);

  return movements;
};


// ===============================
// CIERRE Y VENCIMIENTO
// ===============================

const getClosingDates = async (cardId, userId) => {

  const card = await Card.findOne({
    _id: cardId,
    user: userId
  });

  if (!card) throw new Error("Tarjeta no encontrada");

  const today = new Date();

  const closingDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    20
  );

  const dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    30
  );

  return {
    closingDate,
    dueDate
  };
};


// ===============================
// SALDO Y LIMITE CONSUMIDO
// ===============================

const getCardBalance = async (cardId, userId) => {

  const card = await Card.findOne({
    _id: cardId,
    user: userId
  });

  if (!card) {
    throw new Error("Tarjeta no encontrada");
  }

  // TARJETA DE CRÉDITO
  if (card.type === "credit") {

    const creditLimit = card.creditLimit || 0;
    const availableLimit = card.availableLimit ?? creditLimit;

    const consumed = creditLimit - availableLimit;
    const usagePercentage = (consumed / creditLimit) * 100;

    return {
      type: "credit",
      creditLimit,
      availableLimit,
      consumed,
      usagePercentage
    };
  }

  // TARJETA DE DÉBITO
  if (card.type === "debit") {

    const account = await Account.findById(card.account);

    if (!account) {
      throw new Error("Cuenta no encontrada");
    }

    return {
      type: "debit",
      balance: account.balance
    };
  }

};

// ===============================
// PAGAR TARJETA
// ===============================

const payCreditCard = async (cardId, userId, amount) => {

  const card = await Card.findOne({
    _id: cardId,
    user: userId
  });

  if (!card) throw new Error("Tarjeta no encontrada");

  if (card.type !== "CREDIT") {
    throw new Error("Solo se pueden pagar tarjetas de crédito");
  }

  const account = await Account.findById(card.account);

  if (!account) {
    throw new Error("Cuenta asociada no encontrada");
  }

  if (account.balance < amount) {
    throw new Error("Saldo insuficiente para realizar el pago");
  }

  // calcular deuda actual
  const debtData = await getAmountToPay(cardId);
  const debt = debtData.amountToPay;

  let paymentAmount = amount;
  let creditBalance = 0;

  // detectar sobrepago
  if (amount > debt) {
    creditBalance = amount - debt;
    paymentAmount = debt;
  }

  // descontar dinero de la cuenta
  account.balance -= amount;
  await account.save();

  // registrar pago de deuda
  if (paymentAmount > 0) {

    await Transaction.create({
      user: userId,
      account: account._id,
      card: cardId,
      type: "CARD_PAYMENT",
      amount: paymentAmount,
      description: "Pago de tarjeta de crédito"
    });

  }

  // registrar saldo a favor
  if (creditBalance > 0) {

    await Transaction.create({
      user: userId,
      account: account._id,
      card: cardId,
      type: "CARD_CREDIT_BALANCE",
      amount: creditBalance,
      description: "Saldo a favor para próximo resumen"
    });

  }

  // actualizar limite disponible
  card.availableLimit += paymentAmount;

  if (card.availableLimit > card.creditLimit) {
    card.availableLimit = card.creditLimit;
  }

  await card.save();

  return {
    message: "Pago realizado correctamente",
    paid: paymentAmount,
    creditBalance
  };
};


// ===============================
// BAJA DE TARJETA
// ===============================

const deactivateCard = async (cardId, userId) => {

  const card = await Card.findOneAndUpdate(
    { _id: cardId, user: userId },
    { status: "cancelled" },
    { returnDocument: "after" }
  );

  if (!card) {
    throw new Error("Tarjeta no encontrada");
  }

  return card;
};


module.exports = {
  requestCard,
  getCardDetails,
  enableCard,
  getStatement,
  getAmountToPay,
  getLastPayment,
  getMovements,
  getClosingDates,
  getCardBalance,
  deactivateCard,
  payCreditCard,
  getUserCards
};