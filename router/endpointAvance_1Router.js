/*
- GET /bars/:id_bar/degree?prix_min=10&prix_max=20 => Degré d'alcool moyen des bières d'un bar avec un prix compris entre 10 et 20
- GET /bars/:id_bar/degree?date=2021-01-01 => Degré d'alcool moyen des bières des commandes d'un bar à une date donnée
- GET /bars/:id_bar/commandes?date=2021-01-01&prix_min=10&prix_max=20 => Liste des commandes d'un bar à une date donnée avec un prix compris entre 10 et 20
- GET /bars/:id_bar/commandes?date=2021-01-01&prix_min=10&prix_max=20&status=terminée => Liste des commandes d'un bar à une date donnée avec un prix compris entre 10 et 20 et terminée
- GET /bars/:id_bar/commandes?date=2021-01-01&prix_min=10&prix_max=20&status=terminée&name=example => Liste des commandes d'un bar à une date donnée avec un prix compris entre 10 et 20 et terminée et dont le nom contient "example"
*/
const express = require("express");

const { listBiereByAlcoolDegreeBetweenPrize,
    listBiereByAlcoolDegreeInADate,
    listCommandByDateBetweenPrize,
    listCommandByDateBetweenPrizeWhenFinish,
    listCommandByDateBetweenPrizeWhenFinishWithName } = require("../controller/endpointAvance_1Controller");

const router = express.Router();

router.get("/bars/:id/degree?prix_min&prix_max", listBiereByAlcoolDegreeBetweenPrize);
router.get("/bars/:id/degree?date", listBiereByAlcoolDegreeInADate)
router.get("/bars/:id/commandes?date&prix_min&prix_max", listCommandByDateBetweenPrize)
router.get("/bars/:id/commandes?date&prix_min&prix_max&status", listCommandByDateBetweenPrizeWhenFinish)
router.get("/bars/:id/commandes?date&prix_min&prix_max&status&name", listCommandByDateBetweenPrizeWhenFinishWithName)

module.exports = router;