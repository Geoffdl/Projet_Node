const express = require("express");
const { update, destroy, show } = require("../controller/biereController");

Router.get("/biere/:id_biere", get);
Router.put("/biere/:id_biere", update)
Router.delete("/biere/:id_biere", destroy)

module.exports = Router;
