const express = require("express");

const { index, create, read, update, destroy } = require("../controller/barController");
const { validateBar } = require("../middleware/formRequest/bar_formControl");

const router = express.Router();

router.get("/bars", index);
router.get("/bars/:id", read);
router.post("/bars", validateBar, create);
router.put("/bars/:id", validateBar, update);
router.delete("/bars/:id", destroy);

module.exports = router;

/*
AVANCÉ
- GET /bars?ville=Paris => Liste des bars d'une ville donnée
- GET /bars?name=example => Liste des bars dont le nom contient "example"
- GET /bars/:id_bar/degree => Degré d'alcool moyen des bières d'un bar
*/
