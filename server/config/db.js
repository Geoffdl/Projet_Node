const Sequelize = require("sequelize");

const DIALECT = process.env.DB_DIALECT || "sqlite";
const STORAGE = process.env.DB_STORAGE || "./db.sqlite"; // Always use file-based database

const db = new Sequelize({
    dialect: DIALECT,
    storage: STORAGE,
    logging: false, // disable logging for tests
});

db.sync();

module.exports = db;
