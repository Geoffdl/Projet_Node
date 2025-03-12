const express = require("express");

<<<<<<< HEAD
const { index, create, read, update, destroy } = require("../controller/barController");
const { validateBar } = require("../middleware/formRequest/bar_formControl");
=======
const { index, create, read, update, destroy, getVille, getName } = require("../controller/barController");
const { validateBar, updateBar } = require("../middleware/formRequest/bar_formControl");
>>>>>>> f95daed1bfc3c2f3ce991623513531abb740261b

const router = express.Router();


router.get("/bars", index);
router.get("/bars/:id", read);
router.post("/bars", validateBar, create);
router.put("/bars/:id", updateBar, update);
router.delete("/bars/:id", destroy);

<<<<<<< HEAD
module.exports = router;
=======
router.get("/bars?ville=Paris", getVille);
router.get("/bars?name=example", getName);

module.exports = router;
>>>>>>> f95daed1bfc3c2f3ce991623513531abb740261b
