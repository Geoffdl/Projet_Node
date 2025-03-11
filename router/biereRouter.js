const express = require("express");
const { update, destroy, show,  addBiereBar, getBiereBar } = require("../controller/biereController");
const BiereValidator = require("../middleware/formRequest/BiereFormRequest")

const router = express.Router();

router.get("/biere/:id", show);
router.put("/biere/:id", BiereValidator, update);
router.delete("/biere/:id", destroy);

router.post("/bars/:id_bar/biere", BiereValidator, addBiereBar);
router.get("/bars/:id_bar/biere", getBiereBar);

module.exports = router;
