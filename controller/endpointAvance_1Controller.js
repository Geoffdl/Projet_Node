const sequelize = require("sequelize");
const { Biere, Bar, Commande } = require("../model/models");

const listBiereByAlcoolDegreeBetweenPrize = async (req, res) => {
    const barId = parseInt(req.params.id_bar);

    const minPrix = parseFloat(req.query.prix_min);
    const maxPrix = parseFloat(req.query.prix_max);
    try {
        const bieres = await Biere.findAll({
            where: {
                barId: barId,
                prix: {
                    [Op.between]: [minPrix, maxPrix],
                },
            },
            attributes: [[sequelize.fn("AVG", sequelize.col("degree")), "Degre d'alcool moyen"]],
        });
        res.json(bieres);
    } catch (error) {
        res.status(500).json({ message: "Il n'y a pas de bières dans cette fourchette de prix" });
    }
};

const listBiereByAlcoolDegreeInADate = async (req, res) => {
    const barId = parseInt(req.params.id_bar);

    const date = req.query.date;
    try {
        const bieres = await Biere.findAll({
            where: {
                barId: barId,
            },
            include: [
                {
                    model: Commande,
                    where: {
                        date: date,
                    },
                },
            ],
            attributes: [[sequelize.fn("AVG", sequelize.col("degree")), "Degre d'alcool moyen"]],
        });
        res.json(bieres);
    } catch (error) {
        res.status(500).json({ message: "Il n'y a pas de bières à cette date" });
    }
};

const listCommandByDateBetweenPrize = async (req, res) => {
    const barId = parseInt(req.params.id_bar);
    const date = req.query.date;
    const minPrix = parseFloat(req.query.prix_min);
    const maxPrix = parseFloat(req.query.prix_max);

    try {
        const commandes = await Commande.findAll({
            where: {
                barId: barId,
                date: date,
            },
            include: [
                {
                    model: Biere,
                    where: {
                        prix: {
                            [Op.between]: [minPrix, maxPrix],
                        },
                    },
                },
            ],
            limit: 10,
            offset: 5,
            attributes: ["id", "nom", "prix", "status"],
        });
        res.json(commandes);
    } catch (error) {
        res.status(500).json({ message: "Il n'y a pas de commande à cette date, dans cette fourchette de prix" });
    }
};

const listCommandByDateBetweenPrizeWhenFinish = async (req, res) => {
    const barId = parseInt(req.params.id_bar);
    const date = req.query.date;
    const minPrix = parseFloat(req.query.prix_min);
    const maxPrix = parseFloat(req.query.prix_max);
    const status = req.query.status;

    try {
        const commandes = await Commande.findAll({
            where: {
                barId: barId,
                date: date,
                status: status,
            },
            include: [
                {
                    model: Biere,
                    where: {
                        prix: {
                            [Op.between]: [minPrix, maxPrix],
                        },
                    },
                },
            ],
            limit: 10,
            offset: 5,
            attributes: ["id", "nom", "prix"],
        });
        res.json(commandes);
    } catch (error) {
        res.status(500).json({ message: "Il n'y a pas de commande à cette date, dans cette fourchette de prix qui sont terminées" });
    }
};

const listCommandByDateBetweenPrizeWhenFinishWithName = async (req, res) => {
    const barId = parseInt(req.params.id_bar);
    const date = req.query.date;
    const minPrix = parseFloat(req.query.prix_min);
    const maxPrix = parseFloat(req.query.prix_max);
    const status = req.query.status;
    const name = req.query.name;

    try {
        const commandes = await Commande.findAll({
            where: {
                barId: barId,
                nom: {
                    [db.sequelizeequelize.OP.like]: `%${name}%`,
                },
                date: date,
                status: status,
            },
            include: [
                {
                    model: Biere,
                    where: {
                        prix: {
                            [Op.between]: [minPrix, maxPrix],
                        },
                    },
                },
            ],
            limit: 10,
            offset: 5,
            attributes: ["id", "nom", "prix"],
        });
        res.json(commandes);
    } catch (error) {
        res.status(500).json({
            message: `Il n'y a pas de commande à cette date, dans cette fourchette de prix qui sont terminées dont le nom est ${name}`,
        });
    }
};

module.exports = {
    listBiereByAlcoolDegreeBetweenPrize,
    listBiereByAlcoolDegreeInADate,
    listCommandByDateBetweenPrize,
    listCommandByDateBetweenPrizeWhenFinish,
    listCommandByDateBetweenPrizeWhenFinishWithName,
};
