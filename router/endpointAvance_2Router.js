/*
- GET /bars/:id_bar/biere?sort=asc => Liste des bières d'un bar triées par ordre alphabétique
- GET /bars/:id_bar/biere?sort=desc => Liste des bières d'un bar triées par ordre alphabétique inversé
- GET /bars/:id_bar/biere?sort=asc&limit=10 => Liste des bières d'un bar triées par ordre alphabétique et limitées à 10
- GET /bars/:id_bar/biere?sort=asc&limit=10&offset=5 => Liste des bières d'un bar triées par ordre alphabétique et limitées à 10 en commençant à l'index 5
- GET /bars/:id_bar/biere?sort=asc&limit=10&offset=5&degree_min=5&degree_max=10 => Liste des bières d'un bar triées par ordre alphabétique et limitées à 10 en commençant à l'index 5 avec un degré d'alcool compris entre 5 et 10
- GET /bars/:id_bar/biere?sort=asc&limit=10&offset=5&degree_min=5&degree_max=10&prix_min=10&prix_max=20 => Liste des bières d'un bar triées par ordre alphabétique et limitées à 10 en commençant à l'index 5 avec un degré d'alcool compris entre 5 et 10 et un prix compris entre 10 et 20 (amusez-vous bien)
- GET /commande/details/:id_commande => Renvoie un PDF de la commande
*/

const express = require("express");
const { index, show, store, update, destroy } = require("../controller/endpointAvance_2Controller");

const router = express.Router();

router.get("/bars/:id_bar/biere?sort=asc", listBiereByAlphabeticalOrderAsc);
router.get("/bars/:id_bar/biere?sort=desc", listBiereByAlphabeticalOrderDesc);
router.get("/bars/:id_bar/biere?sort=asc&limit=10", listBiereByAlphabeticalOrderLimit10);
router.get("/bars/:id_bar/biere?sort=asc&limit=10&offset=5", listBiereByAlphabeticalOrderLimitOffset);
router.get("/bars/:id_bar/biere?sort=asc&limit=10&offset=5&degree_min=5&degree_max=10", listBiereByAlphabeticalOrderLimitOffsetSortDegre);
router.get(
    "/bars/:id_bar/biere?sort=asc&limit=10&offset=5&degree_min=5&degree_max=10&prix_min=10&prix_max=20",
    listBiereByAlphabeticalOrderLimitOffsetSortDegreSortPrice
);
router.get("/commande/details/:id_commande", getCommandPDF);

module.exports = router;
