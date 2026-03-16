if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  console.log("ENV:", process.env.MONGO_URI);
}

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});