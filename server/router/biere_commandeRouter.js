const express = require("express");

const { addBiereToCommande, removeBiereCommande } = require("../controller/biere_commandeController");
const router = express.Router();

router.post("/commandes/:id_commande/biere/:id_biere", addBiereToCommande);
router.delete("/commandes/:id_commande/biere/:id_biere", removeBiereCommande);

module.exports = router;
