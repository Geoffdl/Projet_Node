const express = require("express");
const { addBiere } = require("../controller/biereController");

Router.post("/bars/:id_bar/biere", addBiere)

module.exports = Router;