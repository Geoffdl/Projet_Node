const express = require("express");
const model = require("./model/models");
const { barRouter, biereRouter, commandeRouter, biere_commandeRouter } = require("./router/routers");
const cors = require("cors");

const app = express();
require("dotenv").config();
const PORT = process.env.SERVER_PORT || 3000;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(barRouter);
app.use(biereRouter);
app.use(commandeRouter);
app.use(biere_commandeRouter);

app.use((req, res) => {
    res.status(404).json({ message: "Route non définit" });
});

app.listen(PORT, () => {
    console.log(`ça marche ou bien ?! on port ${PORT}`);
});

module.exports = app;
