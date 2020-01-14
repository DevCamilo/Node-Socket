const express = require('express');
const app = express();
const path = require('path');
const socketIO = require('socket.io');

// Public
app.use(express.static(path.join(__dirname, 'public'))); // Adigna al directorio principal la carpeta public

const server = app.listen(process.env.PORT || 3000, () => {
    console.log('Server Start');
});

// web socket
const io = socketIO(server);
io.on('connection', (socket) => {
    // Evento para detectar cuando se concentran un nuevo usuario
    console.log('Nueva conexión',socket.id);
    // Captura el evento enviado desde el front con la información
    socket.on('chat:message', (data) => {
        // Crea un evento desde el servidor para el front
        io.sockets.emit('chat:message', data); // Se envia a todos inluyendo al que lo envió
    });
    // Captura el evento del teclado
    socket.on('chat:typing', (user) => {
        socket.broadcast.emit('chat:typing', user) // Se envía a todos menos al que lo envió
    });
})
