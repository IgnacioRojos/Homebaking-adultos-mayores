const express = require("express");
const router = express.Router();

const authMiddleware = require("../Middlewares/authMiddlewares");
const cardController = require("../Controllers/cardController");

router.post("/request", authMiddleware, cardController.requestCard);

router.get("/:id/details", authMiddleware, cardController.getCardDetails);

router.patch("/:id/enable", authMiddleware, cardController.enableCard);

router.delete("/:id", authMiddleware, cardController.deactivateCard);

router.get("/:id/movements", authMiddleware, cardController.getMovements);

router.get("/:id/last-payment", authMiddleware, cardController.getLastPayment);

router.get("/:id/payment", authMiddleware, cardController.getAmountToPay);

router.get("/:id/dates", authMiddleware, cardController.getClosingDates);

router.get("/:id/balance", authMiddleware, cardController.getCardBalance);

router.post("/:id/purchase", authMiddleware, cardController.registerPurchase);

router.post("/:id/payment", authMiddleware, cardController.registerPayment);

router.post("/:cardId/pay",authMiddleware,cardController.payCreditCard);

router.get("/", authMiddleware,cardController.getUserCards);


module.exports = router;