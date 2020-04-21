const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(200).json({ message: message, data: data });
});

mongoose
    .connect(
        'mongodb+srv://hani037:scar54321@cluster0-3c4x6.mongodb.net/pfa?retryWrites=true&w=majority'
    )
    .then(result => {
        const server = app.listen(8050);
    })
    .catch(err => console.log(err));

