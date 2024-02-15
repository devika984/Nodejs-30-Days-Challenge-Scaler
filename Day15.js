// index.js

const express = require("express");
const loggingMiddleware = require("./loggingMiddleware");
const app = express();

// Use the logging middleware for all routes
app.use(loggingMiddleware);

// Example route
app.get("/", (req, res) => {
  res.send("Hello All, I have completed DAY 15 successfully");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// loggingMiddleware.js

function loggingMiddleware(req, res, next) {
  const timestamp = new Date().toISOString();
  const { method, url, headers, body } = req;
  console.log(`[${timestamp}] ${method} ${url}`);
  console.log('Headers:', headers);
  console.log('Body:', body);
  next();
}

module.exports = loggingMiddleware;
