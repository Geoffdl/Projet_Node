const express = require("express");

<<<<<<< HEAD
const { listBiereByAlcool,
    listCommandByQueries } = require("../controller/endpointAvance_1Controller");

const router = express.Router();

router.get("/bars/:id/degree", listBiereByAlcool);
router.get("/bars/:id/commandes", listCommandByQueries)
=======
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
>>>>>>> f95daed1bfc3c2f3ce991623513531abb740261b

module.exports = router;
