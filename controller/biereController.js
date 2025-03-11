const sequelize = require("sequelize");
const { Biere, Bar } = require("../model/models");

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

    Biere.destroy({where: {id}})
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
        barId: barId })
    .then((biere) => res.status(201).json(biere))
    .catch((err) => res.status(500).json(err));
};

const getBiereBar = async (req, res) => {
    const barId = parseInt(req.params.id_bar);

    Biere.findAll({
        where : {barId : barId}
    })
    .then((commande) => {
        res.json(commande);
    })
    .catch((error) => {
        res.status(500).json({ error: "y'a pas de bières !" });
    });
};

module.exports = { addBiereBar, getBiereBar, update, destroy, show };
