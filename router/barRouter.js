const express = require("express");

const { index, create, read, update, destroy } = require("../controller/barController");

const router = express.Router();

router.get("/bars", index)
router.get("/bars/:id", read)
router.post("/bars", create);
router.put("/bars/:id", update);
router.delete("/bars/:id", destroy);

module.exports = router;

/*
AVANCÉ
- GET /bars?ville=Paris => Liste des bars d'une ville donnée
- GET /bars?name=example => Liste des bars dont le nom contient "example"
- GET /bars/:id_bar/degree => Degré d'alcool moyen des bières d'un bar
*/
