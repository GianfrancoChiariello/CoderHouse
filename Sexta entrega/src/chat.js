const input = document.getElementById('input');
const button = document.getElementById('button');
const chat = document.getElementById('chatBox');

const socket = io();

socket.on('connect', () => {
    console.log('Conectado al servidor');
});

socket.on('mensaje', (payload) => {
    console.log(payload)
    chat.innerHTML += `<p>${payload}</p>`
});

button.addEventListener('click', () => {
    const mensaje = input.value;
    socket.emit('mensaje', mensaje);
    input.value = '';
})
