const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// GET
router.get('/', (req, res, next) => {
    Product.find()
        .then((products) => res.status(200).json({ products }))
        .catch((error) => res.status(400).json({ error }));
});

// GET
router.get('/:id', (req, res, next) => {
    Product.findById(req.params.id)
        .then((product) => res.status(200).json({ product }))
        .catch((error) => res.status(400).json({ error }));
});

// POST
router.post('/', (req, res, next) => {
    delete req.body._id;

    const product = new Product({
        ...req.body,
    });

    product
        .save()
        .then((product) => res.status(201).json({ product }))
        .catch((error) => res.status(400).json({ error }));
});

// PUT
router.put('/:id', (req, res, next) => {
    Product.updateOne(
        { _id: req.params.id },
        { ...req.body, _id: req.params.id }
    )
        .then(() => res.status(200).json({ message: 'Modified!' }))
        .catch((error) => res.status(400).json({ error }));
});

// DELETE
router.delete('/:id', (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Deleted!' }))
        .catch((error) => res.status(400).json({ error }));
});

module.exports = router;
