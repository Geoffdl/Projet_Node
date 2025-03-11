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

    Commande.findByPk(commandeId)
        .then((commande) => {
            if (!commande) {
                return res.status(404).json({ message: "commande pas trouvée" });
            }
            if (commande.status === "terminée") {
                return res.status(400).json({ message: "La commande terminée ne peut pas être modifiée" });
            }

            return Commande.update({ nom, prix, date, status }, { where: { id: commandeId } })
                .then(() => Commande.findByPk(commandeId))
                .then((updatedCommande) => {
                    res.json(updatedCommande);
                });
        })
        .catch((error) => res.status(500).json(error));
};

const destroy = (req, res) => {
    const commandeId = parseInt(req.params.id_commande);

    Commande.destroy({ where: { id: commandeId } })
        .then((deletedCount) => {
            if (deletedCount === 0) {
                return res.status(404).json({ message: "commande pas trouvée" });
            }
            res.status(200).json({ message: "commande supprimée avec succès" });
        })
        .catch((error) => res.status(500).json(error));
};

//"/bars/id_bar/commandes?date=2021-01-01"

const getCommandeAtDate = async (req, res) => {
    const barId = parseInt(req.params.id_bar);
    const searchDate = req.query.date;
    try {
        const listAtDate = await Commande.findAll({
            where: {
                barId: barId,
                date: searchDate,
            },
            attributes: ["id", "nom", "prix", "status"],
        });
        res.json(listAtDate);
    } catch (error) {
        res.status(500).json({ message: "ça marche po" });
    }
};

//GET /bars/:id_bar/commandes?prix_min=10&prix_max=20 => Liste des commandes d'un bar avec un prix compris entre 10 et 20

const getCommandeBetweenValue = async (req, res) => {
    const barId = parseInt(req.params.id_bar);
    const minPrice = parseFloat(req.query.prix_min);
    const maxPrice = parseFloat(req.query.prix_max);

    try {
        const commandesBetweenPrice = await Commande.findAll({
            where: {
                barId: barId,
                prix: {
                    [Op.between]: [minPrice, maxPrice],
                },
            },
            attributes: ["id", "nom", "prix", "status"],
        });
        res.json(commandesBetweenPrice);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des commandes" });
    }
};

module.exports = { index, show, store, update, destroy, getCommandeAtDate, getCommandeBetweenValue };
