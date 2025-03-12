const express = require("express");
const { index, show, store, update, destroy } = require("../controller/commandeController");
const { validateCommande, updateCommande } = require("../middleware/formRequest/commande_formControl");

const router = express.Router();

router.get("/bars/:id/commandes", index);
router.get("/commandes/:id", show);

router.post("/bars/:id_bar/commandes", validateCommande, store);
router.put("/commandes/:id_commande", updateCommande, update);
router.delete("/commandes/:id_commande", destroy);

module.exports = router;
