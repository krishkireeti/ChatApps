const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
    credentials: true,
  }));

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('send message', (msg) => {
    io.emit('receive message', msg); // Broadcasting the message to all clients
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
