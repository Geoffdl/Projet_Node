/*  id : integer
  name : string, unique
  adresse: string
  tel: string, nullable
  email: string
  description: text, nullable
  */

const db = require("../config/db");
const sequelize = require("sequelize");

const Bar = db.define("bars", {
    id: { type: sequelize.INTEGER, autoIcrement: true, primaryKey: true },
    nom: { type: sequelize.STRING, allowNull: false },
    adresse: { type: sequelize.STRING, allowNull: false },
    tel: { type: sequelize.STRING, allowNull: true },
    email: { type: sequelize.STRING, allowNull: false },
    description: { type: sequelize.STRING, allowNull: true },
});

module.exports = Bar;
