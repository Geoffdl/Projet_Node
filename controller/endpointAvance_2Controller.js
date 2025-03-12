const { Op } = require("sequelize");
const { Biere, Bar, Commande } = require("../model/models");

const listBiere = async (req, res) => {
    const barId = parseInt(req.params.id_bar);
    const sortOrder = req.query.sort === "desc" ? "DESC" : "ASC";

    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.limit) || 5;

    const minDegre = req.query.degree_min ? parseFloat(req.params.degree_min) : null;
    const maxDegre = req.query.degree_max ? parseFloat(req.params.degree_max) : null;
    const minPrix = req.query.prix_min ? parseFloat(req.params.prix_min) : null;
    const maxPrix = req.query.prix_max ? parseFloat(req.params.prix_max) : null;
    try {
        const whereConditions = { barId: barId };

        if (minDegre !== null && maxDegre !== null) {
            whereConditions.degree = { [Op.between]: [minDegre, maxDegre] };
        }

        if (minPrix !== null && maxDegre !== null) {
            whereConditions.prix = { [Op.between]: [minPrix, maxPrix] };
        }

        const bieres = await Biere.findAll({
            where: whereConditions,

            order: [["nom", sortOrder]],
            limit: limit,
            offset: offset,
            attributes: ["id", "nom", "prix", "degre"],
        });
        res.json(bieres);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des bières" });
    }
};
const getCommandPDF = async (req, res) => {};

module.exports = {
    listBiere,
    getCommandPDF,
};
