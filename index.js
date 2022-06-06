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

    socket.on('join_room', (data) => {
        socket.join(data.room);
        socket.to(data.room).emit('on_join_room', `${data.name} tham gia cuộc trò chuyện`);
    });

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('recive_message', data);
    });
});

const PORT = process.env.POST || 8080;
server.listen(PORT, () => {
    console.log(`\n\n\nRunning on PORT 👉 http://localhost/${PORT} 🙉\n\n\n`);
});
