// Se llama a la función de io() que viene global desde el archivo que se importo
const socket = io();

// Seleciona todos los elementos a utilizar del DOM
let message = document.getElementById('message');
let userName = document.getElementById('userName');
let button = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

button.addEventListener('click', () => {
    // Emite un evento con la información al servidor
    socket.emit('chat:message', {
        user_name: userName.value,
        message: message.value
    });

});

message.addEventListener('keypress', () => {
    // Emite un evento con las teclas presionadas
    socket.emit('chat:typing', userName.value);
});

// Escucha el evento del servidor con el mismo nombre
socket.on('chat:message', (data) => {
    actions.innerHTML = '';
    output.innerHTML +=`<p>
        <strong>${data.user_name}</strong>: ${data.message}

    </p>`
});

// Escucha si un usuario esta escribiendo
socket.on('chat:typing', (user) => {
    actions.innerHTML = `<p>
        <em>${user} está escribiendo...</em>
    </p>`
});
