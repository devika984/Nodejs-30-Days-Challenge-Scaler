const express = require('express');
const app = express();

// Simple in-memory cache
const cache = {};

// Caching middleware
function cachingMiddleware(req, res, next) {
  const { url } = req;
  const cachedResponse = cache[url];

  if (cachedResponse) {
    console.log(`Cache hit for ${url}`);
    res.send(cachedResponse);
  } else {
    console.log(`Cache miss for ${url}`);
    // Store the original send method to cache the response
    const originalSend = res.send;
    res.send = (body) => {
      cache[url] = body;
      originalSend.call(res, body);
    };
    next();
  }
}

// Middleware to set cache expiration time (e.g., 30 seconds)
app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=30');
  next();
});

// Use the caching middleware
app.use(cachingMiddleware);

// Example route
app.get('/data', (req, res) => {
  res.send('I have completed Day 14');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
