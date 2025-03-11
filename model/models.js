const db = require("../config/db");

const Bar = require("./bars");

const Biere = require("./biere");
const Commande = require("./commande");

// Many-to-many relationship between Biere and Commande

Biere.belongsToMany(Commande, { through: "Biere_Commande", onDelete: `CASCADE` });
Commande.belongsToMany(Biere, { through: "Biere_Commande", onDelete: `CASCADE` });

// One-to-many relationships with Bar
Bar.hasMany(Commande, { onDelete: `CASCADE` });
Bar.hasMany(Biere, { onDelete: `CASCADE` });
Commande.belongsTo(Bar);
Biere.belongsTo(Bar);

module.exports = { Bar, Biere, Commande };
