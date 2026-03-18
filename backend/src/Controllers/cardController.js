const cardService = require("../Services/cardService");
const Card = require("../models/Card")

const requestCard = async (req, res) => {
  try {

    const { type, accountId } = req.body;

    const card = await cardService.requestCard(
      req.user.id,
      type,
      accountId
    );

    res.status(201).json(card);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCardDetails = async (req, res) => {
  try {

    const data = await cardService.getCardDetails(
      req.params.id,
      req.user.id
    );

    res.json(data);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const enableCard = async (req, res) => {
  try {

    const card = await cardService.enableCard(
      req.params.id,
      req.user.id
    );

    res.json(card);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



const deactivateCard = async (req, res) => {
  try {

    const card = await cardService.deactivateCard(
      req.params.id,
      req.user.id
    );

    res.json(card);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getMovements = async (req, res) => {
  try {

    const movements = await cardService.getMovements(
      req.params.id,
      req.user.id
    );

    res.json(movements);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getLastPayment = async (req, res) => {
  try {

    const payment = await cardService.getLastPayment(
      req.params.id,
      req.user.id
    );

    res.json(payment);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAmountToPay = async (req, res) => {
  try {

    const amount = await cardService.getAmountToPay(
      req.params.id,
      req.user.id
    );

    res.json(amount);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getClosingDates = async (req, res) => {
  try {

    const dates = await cardService.getClosingDates(
      req.params.id,
      req.user.id
    );

    res.json(dates);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCardBalance = async (req, res) => {
  try {

    const balance = await cardService.getCardBalance(
      req.params.id,
      req.user.id
    );

    res.json(balance);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const registerPurchase = async (req, res) => {

  try {

    const transaction = await cardService.registerPurchase(
      req.params.id,
      req.body.amount,
      req.body.description
    );

    res.json(transaction);

  } catch (error) {

    res.status(400).json({ message: error.message });

  }
};

const registerPayment = async (req, res) => {

  try {

    const payment = await cardService.registerPayment(
      req.params.id,
      req.body.amount
    );

    res.json(payment);

  } catch (error) {

    res.status(400).json({ message: error.message });

  }
};

const payCreditCard = async (req, res) => {
  try {

    const { amount } = req.body;
    const cardId = req.params.cardId;
    const userId = req.user.id;

    const result = await cardService.payCreditCard(
      cardId,
      userId,
      amount
    );

    res.status(200).json(result);

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

const getUserCards = async (req, res, next) => {
  try {
    const mongoose = require("mongoose");

    const allCards = await Card.find({});


    const cards = await Card.find({
      user: new mongoose.Types.ObjectId(req.user.id)
    });


    res.json(cards);

  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  requestCard,
  getCardDetails,
  enableCard,
  deactivateCard,
  getMovements,
  getLastPayment,
  getAmountToPay,
  getClosingDates,
  getCardBalance,
  registerPurchase,
  registerPayment,
  payCreditCard,
  getUserCards
};