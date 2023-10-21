const bcrypt = require('bcryptjs');
const config = require('../config/config');
const Users = require('../models/user')
const async = require('async')
const app = express()

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
