// index.js code
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    ws.send(message); // Echo back the message
  });
});

app.get('/websocket', (req, res) => {
  fs.readFile('index.html', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      res.send(data);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// index.html code
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WebSocket Chat Day 13 Done 😇</title>
</head>
<body>
  <h1>WebSocket Chat Day 13 Done 😇</h1>
  <div id="output"></div>
  <form id="message-form">
    <input type="text" id="message-input" placeholder="Enter your message">
    <button type="submit">Send</button>
  </form>

  <script src="index.js"></script>
</body>
</html>

// node.js code

const output = document.getElementById('output');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

const ws = new WebSocket(`ws://${window.location.host}/websocket`);

ws.addEventListener('open', () => {
  output.innerHTML += '<p>WebSocket connection established.</p>';
});

ws.addEventListener('message', (event) => {
  output.innerHTML += `<p>Server says: ${event.data}</p>`;
});

ws.addEventListener('error', (error) => {
  output.innerHTML += `<p>Error: ${error.message}</p>`;
});

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const message = messageInput.value.trim();
  if (message) {
    ws.send(message);
    output.innerHTML += `<p>You: ${message}</p>`;
    messageInput.value = '';
  }
});
