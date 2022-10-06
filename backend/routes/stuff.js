const express = require("express");
const Thing = require("../models/Thing");
const router = express.Router();

//GET - Read all things
router.get('/', (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch((error => res.status(400).json({ error })))
});

//POST - Create a thing
router.post('/', (req, res, next) => {
    delete req.body._id;

    Thing.create({ ...req.body })
        .save()
        .then(() => res.status(201).json("Thing created"))
        .catch(error => res.status(400).json({ error }))
});

//GET - Read an thing with its id
router.get('/:id', (req, res, next) => {
    Thing.findById(req.params.id)
        .then(thing => res.status(200).json(thing))
        .catch((error => res.status(400).json({ error })))
});

//PUT - Update a thing with its id
router.put('/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Thing updated" }))
        .catch((error => res.status(400).json(error)))
});

//DELETE - Delete a thing with its id
router.delete('/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Thing deleted" }))
        .catch((error => res.status(400).json(error)))
});

module.exports = router;