const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    cbu: {
      type: String,
      required: true,
      unique: true
    },

    alias: {
      type: String,
      required: true
    },

    type: {
      type: String,
      enum: ["caja_ahorro", "cuenta_corriente"],
      required: true
    },

    balance: {
      type: Number,
      default: 0
    },

    currency: {
      type: String,
      default: "ARS"
    },

    isPrimary: {
      type: Boolean,
      default: false
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// Alias único por usuario
AccountSchema.index({ user: 1, alias: 1 }, { unique: true });

module.exports = mongoose.model("Account", AccountSchema);