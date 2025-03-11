const express = require("express");

const { index, create, read, update, destroy } = require("../controller/barController");
const { addBiereBar, getBiereBar } = require("../controller/biereController");

const router = express.Router();

router.get("/bars"), index;
router.get("/bars/:id_bar"), read;
router.post("/bars", create);
router.put("/bars/:id_bar", update);
router.delete("/bars/:id_bar", destroy);

router.post("/bars/:id_bar/biere", addBiereBar);
router.get("/bars/:id_bar/biere", getBiereBar);

module.exports = router;

/*
AVANCÉ
- GET /bars?ville=Paris => Liste des bars d'une ville donnée
- GET /bars?name=example => Liste des bars dont le nom contient "example"
- GET /bars/:id_bar/degree => Degré d'alcool moyen des bières d'un bar
*/
