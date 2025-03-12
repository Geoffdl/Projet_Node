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
    try {
        const bieres = await Biere.findAll({
            where: {
                barId: barId,
            },
            order: [["nom", "ASC"]],
            attributes: ["id", "nom", "prix", "degre"],
        });
        res.json(bieres);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des bières" });
    }
};

const listBiereByAlphabeticalOrderDesc = async (req, res) => {
    const barId = parseInt(req.params.id_bar);
    try {
        const bieres = await Biere.findAll({
            where: {
                barId: barId,
            },
            order: [["nom", "DESC"]],
            attributes: ["id", "nom", "prix", "degre"],
        });
        res.json(bieres);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des bières" });
    }
};

const listBiereByAlphabeticalOrderLimit10 = async (req, res) => {};
const listBiereByAlphabeticalOrderLimitOffset = async (req, res) => {};
const listBiereByAlphabeticalOrderLimitOffsetSortDegre = async (req, res) => {};
const listBiereByAlphabeticalOrderLimitOffsetSortDegreSortPrice = async (req, res) => {};
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
