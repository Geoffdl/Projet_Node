const express = require("express");

const { index, create, read, update, destroy, getBarByDegree } = require("../controller/barController");
const { validateBar, updateBar } = require("../middleware/formRequest/bar_formControl");


const router = express.Router();


router.get("/bars", index);
router.get("/bars/:id", read);
router.post("/bars", validateBar, create);
router.put("/bars/:id", updateBar, update);
router.delete("/bars/:id", destroy);

router.get("/bars/:id/degree", getBarByDegree);

module.exports = router;
