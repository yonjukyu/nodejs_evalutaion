const Perso = require('../models/Perso');
const auth = require("../middleware/auth");

const getAllPerso = (req, res, next) => {
    console.log("test")
    Perso.find()
        .then((persos) => res.status(200).json(persos))
        .catch((error) => res.status(400).json({ error }));
};

// GET
const getAllPersoFromSomeone = (req, res, next) => {
    Perso.find({_id: req.params.id})
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

module.exports = {
    createPerso,
    getAllPerso,
    getAllPersoFromSomeone
}