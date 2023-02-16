const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const persoRoutes = require('./routes/perso');
const userRoutes = require('./routes/user');
const playerRoutes = require('./routes/player')
const app = express();

mongoose
    .connect(
        'mongodb+srv://admin:test@cluster0.aku3npu.mongodb.net/?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

app.use('/api/perso',persoRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/player', playerRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
