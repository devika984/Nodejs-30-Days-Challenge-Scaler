// index.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

//db.js
const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/your_database_name', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = connectToDatabase;

//userModel.js
const express = require('express');
const User = require('./userModel');
const connectToDatabase = require('./db');

const app = express();
app.use(express.json());

app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

connectToDatabase().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});
