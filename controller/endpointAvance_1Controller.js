const sequelize = require("sequelize");
const { Op } = require("sequelize");
const { Biere, Bar, Commande } = require("../model/models");

const listBiereByAlcool = async (req, res) => {
    const query = {}
    const include = [];
    if(req.query.prix_min && req.query.prix_max){
        query.prix = {[Op.between]: [req.query.prix_min, req.query.prix_max]}
    }
    else if (req.query.date) {
        include.push({
            model: Commande,
            where: { date: req.query.date }
        });
    }

    const barId = parseInt(req.params.id);
    try {
        const bieres = await Biere.findAll({
            where: {
                barId: barId,
                ...query
            },
            include,
            attributes: [[sequelize.fn("AVG", sequelize.col("degree")), "Degre d'alcool moyen"]],
        });
        res.json(bieres);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Il n'y a pas de bières" });
    }
};

const listCommandByQueries = async (req, res) => {
    const query = {}
    const include = [];
//date=2021-01-01&prix_min=10&prix_max=20&status=terminée 
    if (req.query.date)
        {query.date = req.query.date} 
    if (req.query.status)
        {query.status = req.query.status} 
    if (req.query.name)
        {query.name = req.query.name} 
    if (req.query.prix_min && req.query.prix_max){
        include.push({
            model: Biere, 
            where: {prix: {[Op.between]: [req.query.prix_min, req.query.prix_max]}}}
        )
    }

    const barId = parseInt(req.params.id_bar);
    try {
        const commandes = await Commande.findAll({
            where: {
                barId: barId,
                ...query
            },
            include,
            limit: 10,
            offset: 5,
            attributes: ["id", "nom", "prix"],
        });
        res.json(commandes);
    } catch (error) {
        res.status(500).json({ message: "Il n'y a pas de commande"});
    }
};

module.exports = {
    listBiereByAlcool,
    listCommandByQueries
};