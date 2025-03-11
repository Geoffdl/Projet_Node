const sequelize = require("sequelize");
const { Biere, Commande } = require("../model/models");

const addBiereToCommande = async (req, res) => {
    const commandeId = perseInt(req.params.Commande.id);
    const biereId = parseInt(req.params.Biere.id);

    const [commande, biere] = await Promiseall([
        Commande.findByPk(commandeId),
        Biere.findByPk(biereId)
    ])

    if(!commande) return res.status(400).json({message : "commande not found"})
    if(!biere) return res.status(400).json({message: "biere not found"})

    await commande.addBiere(biere)
    res.json({ message: "Added !" })
}

const removeBiereCommande = async (req, res) => {
    const commandeId = perseInt(req.params.Commande.id);
    const biereId = parseInt(req.params.Biere.id);

    const [commande, biere] = await Promiseall([
        Commande.findByPk(commandeId),
        Biere.findByPk(biereId)
    ])

    if(!commande) return res.status(400).json({message : "commande not found"})
    if(!biere) return res.status(400).json({message: "biere not found"})

    await commande.removeBiere(biere)
    res.json({ message: "Delete !" })
}

module.exports = { addBiereToCommande, removeBiereCommande};