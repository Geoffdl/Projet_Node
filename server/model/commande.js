const db = require("../config/db");
const sequelize = require("sequelize");

const Commande = db.define("commandes", {
    id: { type: sequelize.INTEGER, autoIcrement: true, primaryKey: true },
    nom: { type: sequelize.STRING },
    prix: { type: sequelize.FLOAT },
    date: { type: sequelize.DATE },
    status: { type: sequelize.ENUM("brouillon", "en cours", "terminée") },
});

module.exports = Commande;
