const express = require("express");
const barRouter = require("./barRouter");
const biereRouter = require("./biereRouter");
const commandeRouter = require("./commandeRouter");
// const biere_commandeRouter = require("./biere_commandeRouter");

module.exports = { barRouter, biereRouter, commandeRouter };
