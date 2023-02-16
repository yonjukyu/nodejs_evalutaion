const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const stuffController = require('../controllers/Stuff');

// GET
router.get('/', auth, stuffController.getAllStuff);

// POST
router.post('/', auth, multer, stuffController.createStuff);

// GET
router.get('/:id', auth, stuffController.getOneStuff);

// PUT
router.put('/:id', auth, stuffController.updateStuff);

// DELETE
router.delete('/:id', auth, stuffController.deleteStuff);

module.exports = router;
