const sequelize = require("sequelize");
const { Biere, Bar } = require("../model/models");

const show = (req, res) => {
    const id = parseInt(req.params.id)

    Biere.findByPk(id)
        .then((biere) => res.json(biere))
        .catch((err) => res.status(500).json(err))
};

const update = (req, res) => {
    const id = parseInt(req.params.id)
    const { nom, degree, prix} = req.body

    Biere.create({ nom, degree, prix}, {where : {id}})
      .then((biere) => res.status(201).json(biere))
      .catch((err) => res.status(500).json(err))
}

const destroy = (req, res) => {
    const id = parseInt(req.params.id)

    const biere =  Biere.findByPk(id)
      .catch((err) => res.status(500).json(err))

    biere.destroy()
      .then((biere) => res.status(201).json(biere))
      .catch((err) => res.status(500).json(err))
}

const addBiereBar = (req, res) => {
    const barId = parseInt(req.params.barId)
    const bar = Bar.findByPk(barId)
      .catch((err)=> res.status(500).json(err))

    const { nom, degree, prix} = req.body
    Biere.create({ nom, degree, prix, bar})
      .then((biere) => res.status(201).json(biere))
      .catch((err) => res.status(500).json(err))
}

const getBiereBar = async (req, res) => {
    const id = parseInt(req.params.id)

    const biere = await Biere.findByPk(id, { include: [Bar] })
    if (!biere) return res.status(400).json({ message: "Biere not found !" })

    res.json({ bar: biere.Bar })
}

module.export = { addBiereBar, getBiereBar, update, destroy, show };
