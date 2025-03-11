const express = require("express");
const { get } = require("../controller/biereController");

Router.post("/biere", addBiere)
Router.get("/biere", get);

module.exports = Router;
