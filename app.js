var http = require ("http");
var express = require("express");
var app1 = express();
var app2 = express();
const mongoose = require('mongoose');
// require('./database/db'); This line requires and runs the 'db.js' file, establishing the MongoDB connection.
mongoose.connect('mongodb://127.0.0.1:27017/GroupChat', {useNewUrlParser: true})
// Get the default connection
const db = mongoose.connection;

// Define connection event handlers
db.on('connected', () => {
    console.log(`Connected to MongoDB at GroupChat`);
});

app1.set('view engine', 'ejs');

http.createServer(function(req,res){
    res.writeHead(200,{'Content-type':'text/plain'});
    res.end('Hello world!');
}).listen(5000);

app1.get('/', function(req,res){
    res.render('page/index');
})
app1.get('/chatboard', function(req, res){
    res.render('page/chatboard');
})
app1.get('/error', function(req, res){
    res.render('page/error');
})
app1.listen(8080);
console.log('Loading...')

