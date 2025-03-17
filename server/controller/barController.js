const { query } = require("express");
const { Op } = require("sequelize");
const { Bar } = require("../model/models");

const index = async (req, res) => {
    const query = {};

    if (req.query.ville) {
        query.adresse = { [Op.like]: `%${req.query.ville}%` };
    } else if (req.query.name) {
        query.nom = { [Op.like]: `%${req.query.name}%` };
    }

    try {
        const bars = await Bar.findAll({ where: query });
        res.json(bars);
    } catch (error) {
        res.status(400).json({ error: "Y'a pas cette ville là ici" });
    }
};

const read = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const bar = Bar.findByPk(id);
        res.json(bar);
    } catch (error) {
        res.status(500).json({ error: "J'ai pas trouvé ce  bar" });
    }
};

const create = async (req, res) => {
    try {
        const { nom, adresse, tel, email, description } = req.body;

        if (!nom || !adresse || !email) {
            return res.status(400).json({
                error: "Faut rajouter plus de trucs dans nom adresse ou email ",
            });
        }
        const bar = await Bar.create({
            nom,
            adresse,
            email,
            ...req.body,
        });

        res.status(200).json(bar);
    } catch (error) {
        console.error("Actual error:", error);
        res.status(400).json({ error: "Erreur dans la création du bar", details: error.message });
    }
};

const update = async (req, res) => {
    const { id } = req.params;

    try {
        const bar = await Bar.findByPk(id);
        if (!bar) {
            return res.status(404).json({ error: "Y a pas ce bar enfin" });
        }

        await Bar.update(req.body, { where: { id: parseInt(id) } });
        res.json({ message: "Bar mis à jour !!", bar });
    } catch (error) {
        res.status(400).json({ error: "Mise à jour du bar à trop bu, pas marché" });
    }
};

const destroy = async (req, res) => {
    const { id } = req.params;

    try {
        const bar = await Bar.findByPk(id);
        if (!bar) {
            return res.status(404).json({ error: "Y a pas ce bar enfin" });
        }

        await Bar.destroy({ where: { id: parseInt(id) } });
        res.json({ message: "Bar supprimé ....", bar });
    } catch (error) {
        res.status(400).json({ error: "Suppression du bar à trop bu, pas marché" });
    }
};

const getBarByDegree = async (req, res) => {
    const query = {};
    const include = [];
    if (req.query.prix_min && req.query.prix_max) {
        query.prix = { [Op.between]: [req.query.prix_min, req.query.prix_max] };
    } else if (req.query.date) {
        include.push({
            model: Commande,
            where: { date: req.query.date },
        });
    }

    const barId = parseInt(req.params.id);
    try {
        const bieres = await Biere.findAll({
            where: {
                barId: barId,
                ...query,
            },
            include,
            attributes: [[sequelize.fn("AVG", sequelize.col("degree")), "Degre d'alcool moyen"]],
        });
        res.json(bieres);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Il n'y a pas de bières" });
    }
};

module.exports = { index, create, read, update, destroy, getBarByDegree };
