const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const routes = {}; // To store routes for vehicles

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('send-location', (data) => {
        io.emit('receive-location', { id: socket.id, ...data });
    });

    socket.on('set-route', (route) => {
        routes[socket.id] = route;
        io.emit('update-route', { id: socket.id, route });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        io.emit('user-disconnected', socket.id);
        delete routes[socket.id];
    });
});

app.get('/', (req, res) => {
    res.render('index');
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
