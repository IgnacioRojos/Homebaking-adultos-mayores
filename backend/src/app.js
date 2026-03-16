const express = require("express");
const authRoute = require("./routes/authRoute");
const accountRoute = require("./routes/accountRoute");
const cardRoute = require("./routes/cardRoute");
const transactionRoute = require("./routes/transactionsRoute.js")

const app = express();

app.use(express.json());

// rutas
app.use("/api/auth", authRoute);
app.use("/api/accounts",accountRoute);
app.use("/api/card", cardRoute);
app.use("/api/transactions", transactionRoute);

module.exports = app;