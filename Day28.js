//index.js

const express = require('express');
const http = require('http');
const { setupWebSocketServer } = require('./websocket');

const app = express();
const server = http.createServer(app);

// Your Express routes setup
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Setup WebSocket server
setupWebSocketServer(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//websocket.js

const WebSocket = require('ws');

function setupWebSocketServer(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('Client connected');

        ws.on('message', (message) => {
            console.log(`Received message: ${message}`);
            // Broadcast the message to all clients
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });
}

module.exports = { setupWebSocketServer };

//index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Real-time Editor</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        #editor {
            width: 100%;
            height: 90vh;
            border: 1px solid #ccc;
            padding: 10px;
            box-sizing: border-box;
            font-size: 16px;
            resize: none;
        }
    </style>
</head>
<body>
    <textarea id="editor" placeholder="Websocket is running on port 3000""></textarea>

    <script>
        const editor = document.getElementById('editor');
        const ws = new WebSocket('ws://localhost:3000');

        ws.onmessage = function (event) {
            editor.value = event.data;
        };

        editor.addEventListener('input', function () {
            ws.send(editor.value);
        });
    </script>
</body>
</html>

