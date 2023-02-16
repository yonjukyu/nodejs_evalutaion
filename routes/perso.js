const express = require('express');
const router = express.Router();
const persoController = require('../controllers/Perso');
const auth = require("../middleware/auth");

// GET
router.get('/', auth, persoController.getAllPersoFromSomeone);

// GET
router.get('/getPersoWithNameAndClass', auth, persoController.getPersoWithNameAndClass);

// POST
router.post('/createPerso', auth, persoController.createPerso);

// PUT
router.put('/', auth, persoController.updatePerso);

// DELETE
router.delete('/', auth, persoController.deletePerso);

module.exports = router;