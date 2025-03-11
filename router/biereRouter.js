const express = require("express");
const { get } = require("../controller/biereController");

Router.get("/bierre", get);

module.exports = Router;
