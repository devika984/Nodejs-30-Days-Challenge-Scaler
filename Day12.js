const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();

// Apply rate limiting middleware
const limiter = rateLimit({
  windowMs: 20 * 60 * 1000, // 20 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});

app.use(limiter);

// Routes
app.get('/', (req, res) => {
  res.send('Day 12/30 completed by devika9849-challenger');
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
