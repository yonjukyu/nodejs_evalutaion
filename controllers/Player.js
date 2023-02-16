const axios = require('axios').default;
const fs = require('fs');
const getBlizzardToken = (req, res, next) =>{
    console.log(JSON.stringify(req.body));

    axios.post('https://backend-tp-final-nodejs.agence-pixi.fr/wow/compte/check', {
            "username": req.body.username,
            "password": req.body.password
    }).then((response) => {
        res.status(201).json(response.data);
    }).catch((error) => {

        fs.appendFile( 'logs/logs.txt', `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()} : Tentative de connexion invalide \n`, (err) => {
            if (err) {
                console.log(err);
            }
        });
        res.status(400).json({error})
    });
}

module.exports = {
    getBlizzardToken
}