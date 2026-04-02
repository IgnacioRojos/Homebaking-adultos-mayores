const express = require("express");
const cors = require("cors")
const authRoute = require("./routes/authRoute");
const accountRoute = require("./routes/accountRoute");
const cardRoute = require("./routes/cardRoute");
const transactionRoute = require("./routes/transactionsRoute.js")

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "https://homebankingadultosmayores.netlify.app/"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("No permitido por CORS"));
      }
    }
  })
);
app.use(express.json());

// rutas
app.use("/api/auth", authRoute);
app.use("/api/accounts",accountRoute);
app.use("/api/card", cardRoute);
app.use("/api/transactions", transactionRoute);

module.exports = app;