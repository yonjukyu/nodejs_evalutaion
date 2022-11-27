const express = require('express');
const router = express.Router();
const userController = require('../controllers/User');

// POST
router.post('/signup', userController.signUp);

// POST
router.post('/login', userController.login);

module.exports = router;
