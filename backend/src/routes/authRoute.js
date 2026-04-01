const express = require("express");
const authController = require("../Controllers/authController");
const authMiddleware = require("../Middlewares/authMiddlewares");

const router = express.Router();

router.post("/login", authController.login);

router.post("/register", authController.register);

router.get("/me",authMiddleware, authController.getMe);

router.put("/email", authMiddleware, authController.updateEmail);

module.exports = router;