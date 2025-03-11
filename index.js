const express = require("express");

// const biereRouter = require("./router/biereRouter");

const app = express();

app.use(express.json());
// app.use(biereRouter);

app.listen(3000, () => {
    console.log("ça marche ou bien");
});
