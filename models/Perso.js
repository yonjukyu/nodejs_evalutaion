const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const persoSchema = mongoose.Schema({
    name: { type: String, required: true },
    class: { type: String, required: true },
    userId: { type: String, required: true},
    level: { type: Number, required: true},

});

persoSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Perso', persoSchema);
