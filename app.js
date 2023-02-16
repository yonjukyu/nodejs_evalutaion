const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
// const productRoutes = require('./routes/product');

const app = express();

mongoose
    .connect(
        'mongodb+srv://Thomas:Thomas@nodejs.9sgsnza.mongodb.net/?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
//     res.setHeader(
//         'Access-Control-Allow-Headers',
//         'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
//     );
//     next();
// });

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);
// app.use('/api/products', productRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
