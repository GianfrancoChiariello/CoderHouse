import express from 'express'
import {
    Server
} from 'socket.io'
import viewsRouter from './routes/views.router.js'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'


const app = express()

app.use(express.static(`${__dirname}/public`))

//motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')


app.use('/', viewsRouter)

//start server
const server = app.listen(8080, () => console.log("runn!"))

//Socket.io
const io = new Server(server)

/* io.on('connection', socket => {
    console.log("New client connectedd")

    socket.on('message', data => {
        console.log(data)
    })

    socket.emit('evento_socket_individual', 'solo lo recibe este socket')

    socket.broadcast.emit('evento_except_my_socket', 'Todos menos yo')

    io.emit('evento_all' , 'todos los clientes')

}) */

//2da

const logs = []

io.on('connection', socket => {
    console.log('conectado')

    socket.on('message1', data => {
        io.emit('log', data)
    })

    io.emit('log', { logs })

    socket.on('message2', data => {
    logs.push({
            id: socket.id,
            message: data
        })
        io.emit('log', { logs })
    })
})




