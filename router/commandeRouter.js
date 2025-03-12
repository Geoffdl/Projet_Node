const express = require("express");
const {
    index,
    show,
    store,
    update,
    destroy,
    getCommandeAtDate,
    getCommandeBetweenValue,
    getCommandPDF,
} = require("../controller/commandeController");
const { validateCommande, updateCommande } = require("../middleware/formRequest/commande_formControl");

const router = express.Router();

router.get("/bars/:id_bar/commandes", index);
router.get("/commandes/:id", show);
router.get("/commande/details/:id_commande", getCommandPDF);
router.post("/bars/:id_bar/commandes", validateCommande, store);
router.put("/commandes/:id_commande", updateCommande, update);
router.delete("/commandes/:id_commande", destroy);

router.get("/bars/id_bar/commandes?date=2021-01-01", getCommandeAtDate);
router.get("/bars/id_bar/commandes?prix_min=10&prix_max=20", getCommandeBetweenValue);

module.exports = router;
