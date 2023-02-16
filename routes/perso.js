const express = require('express');
const router = express.Router();
const persoController = require('../controllers/Perso');
const auth = require("../middleware/auth");

// GET
router.get('/', auth, persoController.getAllPerso);

// GET
router.get('/:userId', auth, persoController.getAllPersoFromSomeone);

// POST
router.post('/createPerso', auth, persoController.createPerso);

// GET
//router.get('/:name', auth, persoController.getOnePerso);

// PUT
//router.put('/:name', auth, persoController.updatePerso);

// DELETE
//router.delete('/:name', auth, persoController.deletePerso);

module.exports = router;