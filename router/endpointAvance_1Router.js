const express = require("express");

const {
    listBiereByAlcoolDegreeBetweenPrize,
    listBiereByAlcoolDegreeInADate,
    listCommandByDateBetweenPrize,
    listCommandByDateBetweenPrizeWhenFinish,
    listCommandByDateBetweenPrizeWhenFinishWithName,
} = require("../controller/endpointAvance_1Controller");

const router = express.Router();

router.get("/bars/:id/degree?prix_min&prix_max", listBiereByAlcoolDegreeBetweenPrize);
router.get("/bars/:id/degree?date", listBiereByAlcoolDegreeInADate);
router.get("/bars/:id/commandes?date&prix_min&prix_max", listCommandByDateBetweenPrize);
router.get("/bars/:id/commandes?date&prix_min&prix_max&status", listCommandByDateBetweenPrizeWhenFinish);
router.get("/bars/:id/commandes?date&prix_min&prix_max&status&name", listCommandByDateBetweenPrizeWhenFinishWithName);

module.exports = router;
