const express = require('express');
const app = express();

// Define your middleware function
function requestLoggerMiddleware(req, res, next) {
    const timestamp = new Date().toISOString();
    const method = req.method;
    console.log(`${timestamp} - ${method} request received.`);
    next();
}

// Apply the middleware to all incoming requests
app.use(requestLoggerMiddleware);

// Define your route handler for the root endpoint
app.get('/', (req, res) => {
    res.send('Hello, Devika!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost):${PORT}`);
});
