const sequelize = require("sequelize");
const { Op } = require("sequelize");
const { Biere, Bar } = require("../model/models");

const index = (req, res) => {
    const bieres = Biere.findAll()
    res.json(bieres);
}

const show = (req, res) => {
    const id = parseInt(req.params.id);

    Biere.findByPk(id)
        .then((biere) => res.json(biere))
        .catch((err) => res.status(500).json(err));
};

const update = (req, res) => {
    const id = parseInt(req.params.id);
    const { nom, degree, prix } = req.body;

    Biere.update({ nom, degree, prix }, { where: { id } })
        .then((biere) => res.status(201).json(biere))
        .catch((err) => res.status(500).json(err));
};

const destroy = (req, res) => {
    const id = parseInt(req.params.id);

    Biere.destroy({ where: { id } })
        .then((biere) => res.status(201).json(biere))
        .catch((err) => res.status(500).json(err));
};

const addBiereBar = (req, res) => {
    const barId = parseInt(req.params.id_bar);
    const { nom, degree, prix } = req.body;

    Biere.create({
        nom,
        degree,
        prix,
        barId: barId,
    })
        .then((biere) => res.status(201).json(biere))
        .catch((err) => res.status(500).json(err));
};

const getBiereBar = async (req, res) => {
    const barId = parseInt(req.params.id_bar);

    Biere.findAll({
        where: { barId: barId },
    })
        .then((commande) => {
            res.json(commande);
        })
        .catch((error) => {
            res.status(500).json({ error: "y'a pas de bières !" });
        });
};
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
 

module.exports = {index, addBiereBar, getBiereBar, update, destroy, show, listBiere };
