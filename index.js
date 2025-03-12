const express = require("express");
const model = require("./model/models");
const { barRouter, biereRouter, commandeRouter, biere_commandeRouter} = require("./router/routers");

const app = express();
require("dotenv").config();
const PORT = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use(barRouter);
app.use(biereRouter);
app.use(commandeRouter);
app.use(biere_commandeRouter);


app.listen(PORT, () => {
    console.log(`ça marche ou bien ?! on port ${PORT}`);
});

module.exports = app;
