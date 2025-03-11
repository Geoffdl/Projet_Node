const db = require("../config/db");

const Bar = require("./bars");

const Biere = require("./biere");
const Commande = require("./commande");

// Many-to-many relationship between Biere and Commande

Biere.belongsToMany(Commande, { through: "Biere_Commande" });
Commande.belongsToMany(Biere, { through: "Biere_Commande" });

// One-to-many relationships with Bar
Bar.hasMany(Commande);
Bar.hasMany(Biere);
Commande.belongsTo(Bar);
Biere.belongsTo(Bar);

module.exports = { Bar, Biere, Commande };
