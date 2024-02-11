// index.js code

const express = require('express');
const authenticationMiddleware = require('./authenticationMiddleware');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Day 11 completed');
});

// Protected route
app.get('/protected', authenticationMiddleware, (req, res) => {
  res.send('Protected Route');
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// authenticationMiddleware.js code
const jwt = require('jsonwebtoken');

/**
 * Authentication middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function authenticationMiddleware(req, res, next) {
    // Extract the JWT token from the request headers
    const token = req.headers.authorization;

    // Check if the token is present
    if (!token) {
        // If token is not present, return 401 Unauthorized status
        return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, 'your_secret_key');

        // If verification succeeds, attach the decoded token to the request object
        req.user = decoded;

        // Call next middleware or route handler
        next();
    } catch (error) {
        // If verification fails, return 401 Unauthorized status
        return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
}

module.exports = authenticationMiddleware;

// jwtUtils.js code
const jwt = require('jsonwebtoken');

/**
 * Generate JWT token
 * @param {Object} payload - Payload data to be encoded in the token
 * @returns {string} - Generated JWT token
 */
function generateToken(payload) {
    return jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' });
}

/**
 * Verify JWT token
 * @param {string} token - JWT token to be verified
 * @returns {Object} - Decoded token payload
 */
function verifyToken(token) {
    return jwt.verify(token, 'your_secret_key');
}

module.exports = {
    generateToken,
    verifyToken
};

