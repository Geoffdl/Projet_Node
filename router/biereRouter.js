const express = require("express");
const { update, destroy, show, addBiereBar, getBiereBar} = require("../controller/biereController");
const { validateBiere } = require("../middleware/formRequest/BiereFormRequest");

const router = express.Router();

router.get("/biere/:id", show);
router.put("/biere/:id", validateBiere, update);
router.delete("/biere/:id", destroy);

router.post("/bars/:id_bar/biere", validateBiere, addBiereBar);
router.get("/bars/:id_bar/biere", getBiereBar);

module.exports = router;
