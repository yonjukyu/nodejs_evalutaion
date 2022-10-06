const mongoose = require("mongoose");
const express = require("express");
const stuffRoutes = require("./routes/stuff")

const app = express();

mongoose.connect('mongodb+srv://Thomas:Thomas@nodejs.9sgsnza.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
})
    .then(() => console.log('Connected to the database'))
    .catch(() => console.log('Connection failed'));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/stuff', stuffRoutes);

module.exports = app;