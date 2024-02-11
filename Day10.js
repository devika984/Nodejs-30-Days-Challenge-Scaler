const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'index.html'));
});

<!DOCTTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" 
    content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/style.css">
    <title>Day 10</title>
</head>
  <body>
    <h1>&gt;gt; Day 10 of 30 Days Node JS Challenge Scaler</h1>
  </body>
</html>


{
  margin: 0;
  padding: 0;
}

body {
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  font-family: monospace;
  background-color: black;
  color: lime;
}
