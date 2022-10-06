const { model, Schema } = require('mongoose');

module.exports = model('Thing', Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        imageUrl: { type: String, required: true },
        userId: { type: String, required: true }
    }
));