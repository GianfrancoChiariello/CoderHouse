const socket = io()

socket.emit('message', 'my message')


socket.on('evento_socket_individual', data => {
    console.log(data)
})

socket.on('evento_except_my_socket', data => {
    console.log(data)
})

socket.on('evento_all', data => console.log(data))
