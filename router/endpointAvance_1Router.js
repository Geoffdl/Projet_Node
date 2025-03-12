const express = require("express");

const { listBiereByAlcool,
    listCommandByQueries } = require("../controller/endpointAvance_1Controller");

const router = express.Router();

router.get("/bars/:id/degree", listBiereByAlcool);
router.get("/bars/:id/commandes", listCommandByQueries)

module.exports = router;