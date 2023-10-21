var http = require ("http");
var express = require("express");
var app = express();
var app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const session = require('express-session');
require('./database/db'); //This line requires and runs the 'db.js' file, establishing the MongoDB connection.

app.set('view engine', 'ejs');

http.createServer(function(req,res){
    res.writeHead(200,{'Content-type':'text/plain'});
    res.end('Hello world!');
}).listen(5000);

app.get('/', function(req,res){
    res.render('page/index');
})
app.get('/chatboard', function(req, res){
    res.render('page/chatboard');
})
app.get('/error', function(req, res){
    res.render('page/error');
})
app.get('/success', function(req, res){
    res.render('page/success')
})



// const mongoose = require("mongoose");


const Users = mongoose.Schema({
    email: {type:String},
    password:{type:String,require:true},
    firstMame:{type:String},
    lastName:{type:String},
    join:  {type:Date, Default:Date.now() },
    userName:{type:String},
})
// module.exports = mongoose.model('Users', Users);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.get('/register', (req, res) => {
  res.console('Registering'); // Create an EJS view for the registration form
});

app.post('/register', async (req, res) => {
  try {
    const {firstname, lastname, username, email, password } = req.body;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database
    const user = new Member({firstname, lastname, username, email, password: hashedPassword });
    await user.save();

    // Redirect to a success page or the login page
    res.redirect('/success');
  } catch (error) {
    console.error(error);
    res.status(500).send('Registration failed. Please try again.'); // Handle registration errors
  }
});


const regport = process.env.PORT || 8080;
app.listen(regport, () => {
  console.log(`Server is running on port 8080`);
});