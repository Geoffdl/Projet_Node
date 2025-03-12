const express = require("express");

const { index, create, read, update, destroy, getVille, getName } = require("../controller/barController");
const { validateBar } = require("../middleware/formRequest/bar_formControl");

const router = express.Router();

router.get("/bars", index);
router.get("/bars/:id", read);
router.post("/bars", validateBar, create);
router.put("/bars/:id", validateBar, update);
router.delete("/bars/:id", destroy);

router.get("/bars?ville=Paris", getVille)
router.get("/bars?name=example", getName)

module.exports = router;