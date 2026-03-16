const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true
  },

  cardNumber: {
    type: String,
    required: true,
    unique: true
  },

  type: {
    type: String,
    enum: ["credit", "debit"],
    required: true
  },

  creditLimit: {
    type: Number,
    default: 0
  },

  availableLimit: {
    type: Number,
    default: 10000000
  },

  totalPayment: {
    type: Number,
    default: 0
  },

  minimumPayment: {
    type: Number,
    default: 0
  },

  creditBalance: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    enum: ["active", "blocked", "cancelled", "disabled"],
    default: "disabled"
  }

}, { timestamps: true });

module.exports = mongoose.model("Card", CardSchema);