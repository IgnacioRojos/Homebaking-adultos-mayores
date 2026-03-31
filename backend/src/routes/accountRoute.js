const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/authMiddlewares");
const accountController = require("../Controllers/accountController");

/* Obtener todas las cuentas activas */
router.get("/",authMiddleware,accountController.getUserAccounts);

/*Crear caja de ahorros*/
router.post("/",authMiddleware,accountController.createSavingsAccount);

/*Obtener cuenta primaria*/
router.get("/primary",authMiddleware,accountController.getPrimaryAccount);

/* Obtener cuenta específica */
router.get("/:id",authMiddleware,accountController.getAccountById);

/* Obtener saldo */
router.get("/:id/balance",authMiddleware,accountController.getBalance);

/* Obtener últimos movimientos */
router.get("/:id/movements",authMiddleware,accountController.getLastMovements);

/* Modificar cuenta (ej: principal) */
router.put("/:id",authMiddleware,accountController.updateAccount);

/* Soft delete */
router.delete("/:id",authMiddleware,accountController.deleteAccount);

/*Actualizar alias*/
router.patch("/:id/alias", authMiddleware, accountController.updateAlias);

module.exports = router;