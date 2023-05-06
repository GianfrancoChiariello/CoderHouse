const socket = io()

/* const input = document.getElementById('inputt')
const texto = document.getElementById('logs')


input.addEventListener('keyup', evt => {
    socket.emit('message1', evt.target.value)
})


socket.on('log', data => {
    texto.innerHTML+=data
}) */

//2da

const input = document.getElementById('inputt')
const texto = document.getElementById('logs')


input.addEventListener('keyup', evt => {
    if (evt.key === 'Enter') {
        socket.emit('message2', evt.target.value)
        evt.target.value = ''        
    }
})


socket.on('log', data => {
    
    let logs = ''

    data.logs.forEach(log => {
        logs += `<p><strong>${log.id}</strong>: ${log.message}</p><br/>`
    });

    texto.innerHTML = logs


})