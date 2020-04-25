/*
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

var routes = require('./routes/todoListRoutes'); //importing route
routes(app);

//const authRoutes = require('./routes/auth');
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

//app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(200).json({ message: message, data: data });
});
//mongodb+srv://hani037:scar54321@cluster0-3c4x6.mongodb.net/pfa?retryWrites=true&w=majority

mongoose
    .connect(
        'mongodb+srv://hani037:scar54321@cluster0-3c4x6.mongodb.net/pfa?retryWrites=true&w=majority',
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(result => {
        app.listen(8050);
    })
    .catch(err => console.log(err));

    app.listen(8050);

    console.log('todo list RESTful API server started on: ' + 8050);
    
    //get file
    app.use('/content',express.static('uploads'));
    app.use('/',(req,res)=>{
        res.send("I-S 8050")
    });
*/
//new


    var express = require('express');
var app = express();
var port = process.env.PORT || 8050;
var mongoose = require('mongoose');
var Task = require('./models/todoListModels'); //created model loading here
var bodyParser = require('body-parser');
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://hani037:scar54321@cluster0-3c4x6.mongodb.net/pfa?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true }); 
//mongoose.connect('mongodb://127.0.0.1:7000/pfa'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/todoListRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);

//get file
app.use('/uploads',express.static('uploads'));
app.use('/',(req,res)=>{
    res.send("I-S 8050")
});
