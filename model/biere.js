const db = require("../config/db")
const sequelize = require("sequelize")

const Biere = db.define('biere', {
  id: { type: sequelize.INTEGER, autoIncrements : true, primaryKey: true },
  nom: { type: sequelize.STRING },
  degree: {type: sequelize.FLOAT},
  prix: {type: sequelize.FLOAT, validate: {min: 0,}}
})

module.exports = Biere