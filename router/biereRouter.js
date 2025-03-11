const express = require("express");
const { update, destroy, show } = require("../controller/biereController");

const router = express.Router();

router.get("/biere/:id_biere", show);
router.put("/biere/:id_biere", update);
router.delete("/biere/:id_biere", destroy);

module.exports = router;
