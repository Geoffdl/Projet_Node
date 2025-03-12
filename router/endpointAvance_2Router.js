const express = require("express");
const { listBiere, getCommandPDF } = require("../controller/endpointAvance_2Controller");

const router = express.Router();

router.get("/bars/:id_bar/biere", listBiere);

router.get("/commande/details/:id_commande", getCommandPDF);

module.exports = router;
