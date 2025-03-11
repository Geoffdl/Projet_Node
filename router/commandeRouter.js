/*
COMMANDE :
  POST /bars/:id_bar/commandes => Ajouter une commande à un bar
  PUT /commandes/:id_commande => Modifier une commande d'un bar
  DELETE /commandes/:id_commande => Supprimer une commande d'un bar
  GET /bars/:id_bar/commandes => Liste des commandes d'un bar
  GET /commandes/:id => Détail d'une commande d'un bar


*/

const express = require("express");
const { index, show, store, update, destroy } = require("../controller/commandeController");

const router = express.Router();

router.get("/bars/:id_bar/commandes", index);
router.get("/commandes/:id", show);

router.post("/bars/:id_bar/commandes", store);
router.put("/commandes/:id_commande", update);
router.delete("/commandes/:id_commande", destroy);

module.exports = router;
