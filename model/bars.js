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
    nom: { type: sequelize.STRING },
    adresse: { type: sequelize.STRING },
    tel: { type: sequelize.STRING, nullable },
    email: { type: sequelize.STRING },
    description: { type: sequelize.STRING, nullable },
});

module.exports = Bar;
