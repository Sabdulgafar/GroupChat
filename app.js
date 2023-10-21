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


const users = mongoose.Schema({
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

// User registration

app.get('/register', (req, res) => {
  res.console('Registering'); // Create an EJS view for the registration form
});

app.post('/register', async (req, res) => {
  try {
    const {firstname, lastname, username, email, password } = req.body;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database
    const user = new User({firstname, lastname, username, email, password: hashedPassword });
    await user.save();

    // Redirect to a success page or the login page
    res.redirect('/success');
  } catch (error) {
    console.error(error);
    res.status(500).send('Registration failed. Please try again.'); // Handle registration errors
  }
});


// User login
app.get('/login', (req, res) => {
  res.console('loging in');
});

app.post('/login', async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ userName });

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(401).send('Invalid email or password.');
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send('Invalid email or password.');
    }

    // Set up a user session to keep the user logged in
    req.session.userId = user._id;

    // Redirect to a dashboard or user-specific page
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Login failed. Please try again.');
  }
});

const regport = process.env.PORT || 8080;
app.listen(regport, () => {
  console.log(`Server is running on port 8080`);
});