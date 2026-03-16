const express = require("express");
const router = express.Router();

const authMiddleware = require("../Middlewares/authMiddlewares");
const transactionController = require("../Controllers/transactionsController");


// deposito
router.post("/deposit",authMiddleware, transactionController.deposit);

// transferencia
router.post("/transfer",authMiddleware, transactionController.transfer);

// compra tarjeta
router.post("/card-purchase",authMiddleware, transactionController.cardPurchase);

// historial
router.get("/",authMiddleware, transactionController.getUserTransactions);

module.exports = router;