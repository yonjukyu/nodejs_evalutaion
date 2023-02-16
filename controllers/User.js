const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const event = require('../events/sendMail');
const {decode} = require("jsonwebtoken");

// Inscription utilisateur
const signUp = (req, res, next) => {
    console.log(req.body.password)
    bcrypt
        .hash(req.body.password, 10)
        .then((hashPassword) => {
            const user = new User({
                email: req.body.email,
                password: hashPassword,
            });

            user.save()
                .then(() => {
                    res.status(201).json({ message: 'Utilisateur créé !' });
                    event.emit('sendMail', {
                        email: user.email,
                        message: 'Bienvenue sur le site',
                    });
                })
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

// Connexion utilisateur
const login = (req, res, next) => {
    console.log(req.body);
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user)
                return res
                    .status(401)
                    .json({ message: 'Authentification invalide' });

            bcrypt.compare(req.body.password, user.password).then((valid) => {
                if (!valid)
                    return res
                        .status(401)
                        .json({ message: 'Authentification invalide' });
                console.log(req.body.email === "admin@admin.admin")
                if(req.body.email === "admin@admin.admin") {
                    return res.status(200).json({
                            userId: user._id,
                            token: jwt.sign(
                                { userId: user._id, isAdmin: true},
                                'SR1wKQYqlTLVWZSlYkot3xTu0qdZuWDn',
                                { expiresIn: '8760h' }
                            )
                    });
                }
                console.log(user._id)
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id, isAdmin: false},
                        'SR1wKQYqlTLVWZSlYkot3xTu0qdZuWDn',
                        { expiresIn: '24h' }
                    ),
                });
            });
        })
        .catch((error) => res.status(400).json({ error }));
};

const get = (req, res, next) => {
    User.find()
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(400).json({ error }));
}
module.exports = { signUp, login, get };
