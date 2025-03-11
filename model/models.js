const db = require("../config/db");

const Bar = require("./bars");

const Biere = require("./biere");
const Commande = require("./commande");

Biere.hasMany(Commande, { through: "Biere_Comande" });
Commande.hasMany(Biere, { through: "Biere_Comande" });

Commande.belongsTo(Bar);
Bar.hasMany(Commande);

Biere.belongsTo(Bar)
Bar.hasMany(Biere)

module.exports = { Bar, Biere, Commande };
