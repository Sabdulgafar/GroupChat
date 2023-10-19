const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/GroupChat', {useNewUrlParser: true})
// Get the default connection
const db = mongoose.connection;

// Define connection event handlers
db.on('connected', () => {
    console.log(`Connected to MongoDB at GroupChat`);
});