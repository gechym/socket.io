require('dotenv').config({ path: './config.env' });
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('send_message', (data) => {
        console.log(data);
        socket.broadcast.emit('recive_message', data);
    });
});

const PORT = process.env.POST || 8080;
server.listen(PORT, () => {
    console.log(`\n\n\nRunning on PORT 👉 http://localhost/${PORT} 🙉\n\n\n`);
});
