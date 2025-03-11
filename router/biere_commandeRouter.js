const express = require("express");

const { addBiereToCommande, removeBiereCommande } = require("../controller/biere_commandeController");
const router = express.Router();

/*
BIERE_COMMANDE :
  POST /commandes/:id/biere/:id => Ajouter une bière à une commande
  DELETE /commandes/:id/biere/:id => Supprimer une bière d'une commande
*/
router.post("/commandes/:id_commande/biere/:id_biere", addBiereToCommande);
router.delete("/commandes/:id_commande/biere/:id_biere", removeBiereCommande);

/*
  AVANCÉ: 
- GET /bars/:id_bar/commandes?date=2021-01-01 => Liste des commandes d'un bar à une date donnée
- GET /bars/:id_bar/commandes?prix_min=10&prix_max=20 => Liste des commandes d'un bar avec un prix compris entre 10 et 20
*/

module.exports = router;
