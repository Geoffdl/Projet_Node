const express = require("express");
const model = require("./model/models");
const { barRouter, biereRouter } = require("./router/routers");

const app = express();
require("dotenv").config();
const PORT = process.env.SERVER_PORT || 3001;

app.use(express.json());
app.use(barRouter);
app.use(biereRouter);

app.listen(PORT, () => {
    console.log(`ça marche ou bien ?! on port ${PORT}`);
});
