const { Commande, Bar } = require("../model/models");
const sequelize = require("sequelize");

const index = (req, res) => {
    const barId = parseInt(req.params.id_bar);
    Commande.findAll({
        where: { barId: barId },
    })
        .then((commande) => {
            res.json(commande);
        })
        .catch((error) => {
            res.status(500).json({ error: "ça marche pas pour récuperer les commandes de ce bar" });
        });
};

const show = (req, res) => {
    const commandeId = parseInt(req.params.id);

    Commande.findByPk(commandeId)
        .then((commande) => {
            if (!commande) {
                return res.status(404).json({ message: "pas trouvé la commande" });
            }
            res.json(commande);
        })
        .catch((error) => {
            res.status(400).json({ message: "Il n'y pas de commandes pour ce bar ?? #sobre" });
        });
};

const store = (req, res) => {
    const barId = parseInt(req.params.id_bar);
    const { nom, prix, date, status } = req.body;

    if (!nom || !prix || !date || !status) {
        return res.status(400).json({ error: "Verfifez le corps de la requete ça marche pas" });
    }

    Commande.create({
        barId: barId,
        nom,
        prix,
        date,
        status,
    })
        .then((commande) => {
            res.status(201).json(commande);
        })
        .catch((error) => {
            res.status(500).json({ error: "marche pas" });
        });
};

const update = (req, res) => {
    const commandeId = parseInt(req.params.id_commande);
    const { nom, prix, date, status } = req.body;
    Commande.update({ nom, prix, date, status }, { where: { id } })
        .then(() => Commande.findByPk(commandeId))
        .then((commande) => {
            if (!commande) {
                return res.status(404).json({ message: "commande pas trouvée" });
            }
            res.json(commande);
        })
        .catch((error) => res.status(500).json(error));
};

const destroy = (req, res) => {
    const commandeId = parseInt(req.params.id_commande);

    Commande.destroy({ where: { id } })
        .then(() => Commande.findByPk(commandeId))
        .then((commande) => {
            if (!commande) {
                return res.status(404).json({ message: "commande pas trouvée" });
            }
            res.json(commande);
        })
        .catch((error) => res.status(500).json(error));
};

module.exports = { index, show, store, update, destroy };
