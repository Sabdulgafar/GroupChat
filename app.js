var http = require ("http");
var express = require("express");
var app1 = express();
var app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const session = require('express-session');
require('./database/db'); //This line requires and runs the 'db.js' file, establishing the MongoDB connection.

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
app1.get('/success', function(req, res){
    res.render('page/success')
})

app1.listen(8080);
console.log('Loading...')



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


app1.use(bodyParser.urlencoded({ extended: true }));
app1.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

app1.get('/register', (req, res) => {
  res.console('Registering'); // Create an EJS view for the registration form
});

app1.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    // Redirect to a success page or the login page
    res.redirect('/success');
  } catch (error) {
    res.status(500).send('Registration failed. Please try again.'); // Handle registration errors
  }
});


const regport = process.env.PORT || 3000;
app1.listen(regport, () => {
  console.log(`Server is running on port 3000`);
});