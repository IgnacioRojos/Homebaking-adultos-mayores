const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
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

    card: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card"
    },

    type: {
      type: String,
      enum: [
        "DEPOSIT",
        "TRANSFER",
        "CARD_PURCHASE",
        "CARD_PAYMENT",
        "REVERSAL"
      ],
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    description: {
      type: String
    },

    status: {
      type: String,
      enum: ["PENDING", "COMPLETED"],
      default: "COMPLETED"
    },

    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transactions", TransactionSchema);