// Import the mongoose library
const mongoose = require ('mongoose');

// Configure and establish the MongoDB connection
mongoose.connect('mongodb://localhost:27017/GroupChat');

// Get the default connection
const db = mongoose.connection;

// Define connection event handlers
db.on('connected', () => {
    console.log(`Connected to MongoDB at ${dbURL}`);
});

// Close the MongoDB connection when the Node.js application terminates
process.on('SIGINT', () => {
    db.close(() => {
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
    });
});
