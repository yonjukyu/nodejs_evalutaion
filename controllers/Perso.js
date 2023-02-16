const Perso = require('../models/Perso');

// GET
const getAllPersoFromSomeone = (req, res, next) => {
    Perso.findById(req.query.id)
        .then((persos) => res.status(200).json(persos))
        .catch((error) => res.status(400).json({ error }));
}

const getAll = (req, res, next) => {
    Perso.find()
        .then((persos) => res.status(200).json(persos))
        .catch((error) => res.status(400).json({ error }));
}

const getPersoWithNameAndClass = (req, res, next) => {
    Perso.find({class: req.query.class,
                    name: req.query.name})
        .then((persos) => res.status(200).json(persos))
        .catch((error) => res.status(400).json({ error }));
}

// PUT
const createPerso = (req, res, next) => {
    delete req.body._id;
    delete req.body.userId;

    Perso.findOne({
        name: req.body.name,
        class: req.body.class
    })
        .then((perso) => {
            console.log(req.auth.isAdmin)
            if(!perso ) {
                if (!req.auth.isAdmin) {
                    const perso = new Perso({
                        ...req.body,
                        userId: req.auth.userId,
                    });
                    perso
                        .save()
                        .then(() => res.status(201).json({message: 'Perso enregistré !'}))
                        .catch((error) => res.status(400).json({error}));
                } else {
                    return res.status(400).json({message: "Les admins ne peuvenet pas créer de personnage"})
                }
            }
            else{
                return res.status(400).json({message: "Paire pseudo et classe déjà existante"});
            }
        })
}

const updatePerso = (req, res, next) => {
    delete req.body.id;
    console.log(req.auth.isAdmin)

    Perso.findOne({
        name: req.query.name,
        class: req.query.class
    })
        .then((perso) => res.status(401).json({message : "Paire pseudo et classe déjà existante"}))
        .catch((error) => res.status(400).json({ error }));

    Perso.findOne({ _id: req.query.id })
        .then((perso) => {
            if (perso.userId !== req.auth.userId && !req.auth.isAdmin) {
                res.status(401).json({ message: "Ce n'est pas votre perso !" });
            } else {
                perso.updateOne({ _id: req.query.id }, { ...req.body.id, _id: req.query.id })
                    .then(() => {
                        res.status(200).json({ message: 'Objet modifié !' });
                    })
                    .catch((error) => res.status(400).json({ error }));
            }
        })
        .catch((error) => res.status(400).json({ error }));
};
const deletePerso = (req, res, next) => {
    console.log(req.query.id)
    Perso.findOne({ _id: req.query.id })
        .then((perso) => {
            if (perso.userId !== req.auth.userId && !req.auth.isAdmin) {
                res.status(401).json({ message: "Ce n'est pas votre Perso !" });
            } else {
                Perso.deleteOne({ _id: req.query.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                    .catch((error) => res.status(400).json({ error }));
            }
        })
        .catch((error) => res.status(400).json({ error }));
};
module.exports = {
    createPerso,
    getAllPersoFromSomeone,
    getPersoWithNameAndClass,
    getAll,
    updatePerso,
    deletePerso
}