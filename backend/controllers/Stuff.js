const fs = require('fs');
const event = require('../events/createFile');
const Thing = require('../models/Thing');

// Récupère tous les objets
const getAllStuff = (req, res, next) => {
    Thing.find()
        .then((things) => res.status(200).json(things))
        .catch((error) => res.status(400).json({ error }));
};

// Crée l'objet
const createStuff = (req, res, next) => {
    const thingObject = JSON.parse(req.body.thing);
    
    delete thingObject._id;
    delete thingObject.userId;

    const thing = new Thing({
        ...thingObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });

    thing
        .save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch((error) => res.status(400).json({ error }));
};

// Récupère un objet
const getOneStuff = (req, res, next) => {
    Thing.findById(req.params.id)
        .then((thing) => res.status(200).json(thing))
        .catch((error) => res.status(400).json({ error }));
};

// Modifie un objet
const updateStuff = (req, res, next) => {
    const thingObject = req.file ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete thingObject.userId;

    Thing.findOne({ _id: req.params.id })
        .then((thing) => {
            if (thing.userId !== req.auth.userId) {
                res.status(401).json({ message: "Ce n'est pas votre objet !" });
            } else {
                Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
                .then(() => {

                    event.emit('createFile', { file: 'updateLogs', message: `[${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}] Le fichier ${thing.title} a été modifié\n` });

                    res.status(200).json({ message: 'Objet modifié !' });
                })
                .catch((error) => res.status(400).json({ error }));
            }
        })
        .catch((error) => res.status(400).json({ error }));
};

// Supprime un objet
const deleteStuff = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then((thing) => {
            if (thing.userId !== req.auth.userId) {
                res.status(401).json({ message: "Ce n'est pas votre objet !" });
            } else { 
                const fileName = thing.imageUrl.split('/images/')[1];

                fs.unlink(`images/${fileName}`, (error) => {
                    if (error) return console.log(error);

                    Thing.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                    .catch((error) => res.status(400).json({ error }));
                });
            }
        })
        .catch((error) => res.status(400).json({ error }));
};

module.exports = {
    getAllStuff,
    createStuff,
    getOneStuff,
    updateStuff,
    deleteStuff,
};
