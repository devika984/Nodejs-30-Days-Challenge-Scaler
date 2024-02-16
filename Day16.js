// index.js

const express = require('express');
const mongoose = require('mongoose');
const connectToMongoDB = require('./mongoDB');

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectToMongoDB();

// Routes
app.get('/', (req, res) => {
  res.send('Hello Node JS Day 16 completed');
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// mongoDB.js

const mongoose = require('mongoose');

function connectToMongoDB() {
  // MongoDB connection string
  const connectionString = 'mongodb://localhost/mydatabase';

  // Connect to MongoDB
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Connection events
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Connection error:'));
  db.once('open', () => {
    console.log('MongoDB connection successful');
  });
}

module.exports = connectToMongoDB;
