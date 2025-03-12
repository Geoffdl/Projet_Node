/*
COMMANDE :
  POST /bars/:id_bar/commandes => Ajouter une commande à un bar
  PUT /commandes/:id_commande => Modifier une commande d'un bar
  DELETE /commandes/:id_commande => Supprimer une commande d'un bar
  GET /bars/:id_bar/commandes => Liste des commandes d'un bar
  GET /commandes/:id => Détail d'une commande d'un bar


*/

const express = require("express");
const { index, show, store, update, destroy, getCommandeAtDate, getCommandeBetweenValue } = require("../controller/commandeController");
const { validateCommande } = require("../middleware/formRequest/commande_formControl");

const router = express.Router();

router.get("/bars/:id_bar/commandes", index);
router.get("/commandes/:id", show);

router.post("/bars/:id_bar/commandes", validateCommande, store);
router.put("/commandes/:id_commande", validateCommande, update);
router.delete("/commandes/:id_commande", destroy);

router.get("/bars/id_bar/commandes?date=2021-01-01", getCommandeAtDate);
router.get("/bars/id_bar/commandes?prix_min=10&prix_max=20", getCommandeBetweenValue);

module.exports = router;
