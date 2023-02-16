const express = require('express');
const auth = require("../middleware/auth");
const persoController = require("../controllers/Player");
const router = express.Router();

// POST
router.post('/getBlizzardToken', auth, persoController.getBlizzardToken);


module.exports = router;