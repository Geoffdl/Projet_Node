/* 
router.get("/bars/:id_bar/biere?sort=asc", listBiereByAlphabeticalOrderAsc);
router.get("/bars/:id_bar/biere?sort=desc", listBiereByAlphabeticalOrderDesc);
router.get("/bars/:id_bar/biere?sort=asc&limit=10", listBiereByAlphabeticalOrderLimit10);
router.get("/bars/:id_bar/biere?sort=asc&limit=10&offset=5", listBiereByAlphabeticalOrderLimitOffset);
router.get("/bars/:id_bar/biere?sort=asc&limit=10&offset=5&degree_min=5&degree_max=10", listBiereByAlphabeticalOrderLimitOffsetSortDegre);
router.get("/bars/:id_bar/biere?sort=asc&limit=10&offset=5&degree_min=5&degree_max=10&prix_min=10&prix_max=20", listBiereByAlphabeticalOrderLimitOffsetSortDegreSortPrice);
router.get("/commande/details/:id_commande", getCommandPDF);
*/

const sequelize = require("sequelize");
const { Biere, Bar, Commande } = require("../model/models");

const listBiereByAlphabeticalOrderAsc = async (req, res) => {
    const barId = parseInt(req.params.id_bar);
    const sortOrder = req.query.sort === "desc" ? "DESC" : "ASC";
    try {
        const bieres = await Biere.findAll({
            where: {
                barId: barId,
            },
            order: [["nom", sortOrder]],
            attributes: ["id", "nom", "prix", "degre"],
        });
        res.json(bieres);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des bières" });
    }
};

const listBiereByAlphabeticalOrderDesc = async (req, res) => {
    const barId = parseInt(req.params.id_bar);
    const sortOrder = req.query.sort === "desc" ? "DESC" : "ASC";
    try {
        const bieres = await Biere.findAll({
            where: {
                barId: barId,
            },
            order: [["nom", sortOrder]],
            attributes: ["id", "nom", "prix", "degre"],
        });
        res.json(bieres);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des bières" });
    }
};

const listBiereByAlphabeticalOrderLimit10 = async (req, res) => {
    const barId = parseInt(req.params.id_bar);
    const sortOrder = req.query.sort === "desc" ? "DESC" : "ASC";

    const limit = parseInt(req.query.limit) || 10;

    try {
        const bieres = await Biere.findAll({
            where: {
                barId: barId,
            },
            order: [["nom", sortOrder]],
            limit: limit,
            attributes: ["id", "nom", "prix", "degre"],
        });
        res.json(bieres);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des bières" });
    }
};
const listBiereByAlphabeticalOrderLimitOffset = async (req, res) => {
    const barId = parseInt(req.params.id_bar);
    const sortOrder = req.query.sort === "desc" ? "DESC" : "ASC";

    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 5;

    try {
        const bieres = await Biere.findAll({
            where: {
                barId: barId,
            },
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
const listBiereByAlphabeticalOrderLimitOffsetSortDegre = async (req, res) => {
    const barId = parseInt(req.params.id_bar);
    const sortOrder = req.query.sort === "desc" ? "DESC" : "ASC";

    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.limit) || 5;

    const minDegre = parseFloat(req.params.degree_min);
    const maxDegre = parseFloat(req.params.degree_max);
    try {
        const bieres = await Biere.findAll({
            where: {
                barId: barId,
                degree: {
                    [Op.between]: [minDegre, maxDegre],
                },
            },
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
const listBiereByAlphabeticalOrderLimitOffsetSortDegreSortPrice = async (req, res) => {
    const barId = parseInt(req.params.id_bar);
    const sortOrder = req.query.sort === "desc" ? "DESC" : "ASC";

    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.limit) || 5;

    const minDegre = parseFloat(req.params.degree_min);
    const maxDegre = parseFloat(req.params.degree_max);
    const minPrix = parseFloat(req.params.prix_min);
    const maxPrix = parseFloat(req.params.prix_max);
    try {
        const bieres = await Biere.findAll({
            where: {
                barId: barId,
                degree: {
                    [Op.between]: [minDegre, maxDegre],
                },
                prix: {
                    [Op.between]: [minPrix, maxPrix],
                },
            },
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
    listBiereByAlphabeticalOrderAsc,
    listBiereByAlphabeticalOrderDesc,
    listBiereByAlphabeticalOrderLimit10,
    listBiereByAlphabeticalOrderLimitOffset,
    listBiereByAlphabeticalOrderLimitOffsetSortDegre,
    listBiereByAlphabeticalOrderLimitOffsetSortDegreSortPrice,
    getCommandPDF,
};
