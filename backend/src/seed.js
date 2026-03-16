require("dotenv").config({ path: __dirname + "/../.env" });

const connectDB = require("./config/db");

const User = require("./models/Users");
const Account = require("./models/Account");
const Card = require("./models/Card");
const Transaction = require("./models/Transactions");

const seedDatabase = async () => {
  try {

    await connectDB();

    console.log("Iniciando seed de base de datos...");

    // limpiar base
    await Transaction.deleteMany();
    await Card.deleteMany();
    await Account.deleteMany();
    await User.deleteMany();

    console.log("Base limpiada");

    // ======================
    // CREAR USUARIOS
    // ======================

    const bcrypt = require("bcryptjs");

    const password = await bcrypt.hash("123456", 10);

    const users = await User.create([
    {
        fullName: "Ignacio Rojos",
        dni: "30123456",
        email: "ignacio@test.com",
        password: password
    },
    {
        fullName: "Maria Lopez",
        dni: "28987654",
        email: "maria@test.com",
        password: password
    },
    {
        fullName: "Carlos Perez",
        dni: "31222333",
        email: "carlos@test.com",
        password: password
    }
    ]);

    console.log("Usuarios creados");

    // ======================
    // CREAR CUENTAS
    // ======================

    const accounts = await Account.create([
    {
        user: users[0]._id,
        type: "caja_ahorro",
        alias: "nacho.principal",
        cbu: "0000003100000000000001",
        balance: 150000,
        currency: "ARS",
        isPrimary: true
    },
    {
        user: users[1]._id,
        type: "caja_ahorro",
        alias: "maria.ahorros",
        cbu: "0000003100000000000002",
        balance: 80000,
        currency: "ARS"
    },
    {
        user: users[2]._id,
        type: "cuenta_corriente",
        alias: "carlos.negocio",
        cbu: "0000003100000000000003",
        balance: 230000,
        currency: "ARS"
    }
    ]);
    console.log("Cuentas creadas");

    // ======================
    // CREAR TARJETAS
    // ======================
    const cards = await Card.create([
    {
        user: users[0]._id,
        account: accounts[0]._id,
        cardNumber: "4111111111111111",
        type: "credit",
        creditLimit: 200000,
        availableBalance: 200000,
        status: "active"
    },
    {
        user: users[1]._id,
        account: accounts[1]._id,
        cardNumber: "5500000000000004",
        type: "debit",
        status: "active"
    }
    ]);

        console.log("Tarjetas creadas");

    // ======================
    // CREAR TRANSACCIONES
    // ======================

    const transactions = [];

    for (let i = 0; i < 10; i++) {
    transactions.push({
        user: users[0]._id,
        account: accounts[0]._id,
        type: "DEPOSIT",
        amount: Math.floor(Math.random() * 10000) + 1000,
        description: "Movimiento de prueba"
    });
    }

    await Transaction.create(transactions);
    console.log("Transacciones creadas");

    console.log("Seed completado correctamente");

    process.exit();

  } catch (error) {

    console.error("Error en seed:", error);
    process.exit(1);

  }
};

seedDatabase();