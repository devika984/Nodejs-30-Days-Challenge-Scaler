const express = require('express');
const app = express();
// Define a route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
// Error handling middleware
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
}
// Register the error handling middleware
app.use(errorHandler);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
