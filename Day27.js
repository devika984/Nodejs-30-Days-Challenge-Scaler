const express = require('express');
const app = express();
const authMiddleware = require('./authMiddleware');

// Middleware to parse JSON bodies
app.use(express.json());

// Route that requires authentication and authorization
app.get('/protected', authMiddleware.authenticateAndAuthorize, (req, res) => {
  res.send('Protected route accessed');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // Change this to a secure value
const users = [
  { id: 1, username: 'admin', password: 'admin', role: 'admin' },
  { id: 2, username: 'user', password: 'user', role: 'user' }
];

function authenticateAndAuthorize(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const user = users.find(u => u.id === decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  });
}

function generateToken(user) {
  return jwt.sign({ id: user.id }, secretKey);
}

module.exports = { authenticateAndAuthorize, generateToken };
