const { Commande, Bar } = require("../model/models");
const { Op } = require("sequelize");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const sequelize = require("sequelize");

const index = async (req, res) => {
    const query = {}

    if (req.query.date)
        {query.date = req.query.date} 
    if (req.query.status)
        {query.status = req.query.status} 
    if (req.query.name)
        {query.name = req.query.name} 
    if (req.query.prix_min && req.query.prix_max){
        query.prix = {[Op.between]: [req.query.prix_min, req.query.prix_max]}
    }

    const barId = parseInt(req.params.id);
    try {
        const commandes = await Commande.findAll({
            where: {
                barId: barId,
                ...query
            },
            limit: 10,
            offset: 5,
            attributes: ["id", "nom", "prix", "status"],
        });
        res.json(commandes);
    } catch (error) {
        res.status(500).json({ message: "Il n'y a pas de commande"});
    }
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

const update = async (req, res) => {
    const commandeId = parseInt(req.params.id_commande);
    const { nom, prix, date, status, barId } = req.body;
    try {
        const commande = await Commande.findByPk(commandeId);
        if (commande === null) {
            return res.status(404).json({ message: "commande pas trouvée" });
        }
        if (commande.status === "terminée") {
            return res.status(400).json({ message: "La commande terminée ne peut pas être modifiée" });
        }
        const updated = await commande.update({ nom, prix, date, status, barId });

        res.json(updated);
    } catch (error) {
        res.status(500).json(error);
    }
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

const getCommandPDF = async (req, res) => {
    const { id_commande } = req.params;

    try {
        const commandeDetails = await Commande.findByPk(id_commande);

        if (!commandeDetails) {
            return res.status(404).send("Commande not found");
        }

        const doc = new PDFDocument();

        const fileName = `commande_${id_commande}.pdf`;
        const writeStream = fs.createWriteStream(fileName);
        doc.pipe(writeStream);

        doc.fontSize(25).text(`Commande Details for ID: ${id_commande}`, 100, 100);
        doc.text(`Customer Name: ${commandeDetails.customerName}`);
        doc.text(`Total Amount: ${commandeDetails.totalAmount}`);

        doc.end();

        writeStream.on("finish", function () {
            res.download(fileName, function (err) {
                if (err) {
                    console.error("Error sending file:", err);
                }
                fs.unlinkSync(fileName);
            });
        });

        writeStream.on("error", function (err) {
            console.error("Error writing PDF:", err);
        });
    } catch (error) {
        console.error("Error fetching commande details:", error);
        res.status(500).send("Internal Server Error");
    }
};


module.exports = { index, show, store, update, destroy, getCommandPDF};
