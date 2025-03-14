const express = require("express");

const { index, create, read, update, destroy } = require("../controller/barController");
const { validateBar, updateBar } = require("../middleware/formRequest/bar_formControl");

const router = express.Router();

router.get("/bars", index);
router.get("/bars/:id", read);
router.post("/bars", validateBar, create);
router.put("/bars/:id", updateBar, update);
router.delete("/bars/:id", destroy);

module.exports = router;
