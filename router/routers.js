const express = require("express");
const barRouter = require("./barRouter");
const biereRouter = require("./biereRouter");
const commandeRouter = require("./commandeRouter");
const biere_commandeRouter = require("./biere_commandeRouter");

const endpointAvance_1Router = require("./endpointAvance_1Router");
const endpointAvance_2Router = require("./endpointAvance_2Router");

module.exports = { barRouter, biereRouter, commandeRouter, biere_commandeRouter, endpointAvance_1Router, endpointAvance_2Router };
