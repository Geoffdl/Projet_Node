const { Bar } = require("../model/models");

const index = (req, res) => {
    Bar.findAll().then((bar) => {
        res.json(bar);
    });
};
const read = (req, res) => {
    const id = parseInt(req.params.id);
    Bar.findByPk(id).then((bar) => {
        res.json(bar);
    });
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

        res.status(201).json(bar);
    } catch (error) {
        res.status(400).json({ error: "ça marche pas" });
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

        await Bar.destroy( { where: { id: parseInt(id) } });
        res.json({ message: "Bar supprimé ....", bar });
    } catch (error) {
        res.status(400).json({ error: "Suppression du bar à trop bu, pas marché" });
    }
};

module.exports = { index, create, read, update, destroy };
