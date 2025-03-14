const Sequelize = require("sequelize");

const DIALECT = process.env.DB_DIALECT || "sqlite";
const STORAGE =
    process.env.NODE_ENV === "test"
        ? ":memory:" // Use in-memory database for testing
        : process.env.DB_STORAGE || "./db.sqlite"; // Use file-based database for other environments

const db = new Sequelize({
    dialect: DIALECT,
    storage: STORAGE,
    // logging: false, // disable logging for tests
});

db.sync();

module.exports = db;
