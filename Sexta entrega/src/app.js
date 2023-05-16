import express from 'express'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import connect from './utils/mongoo.connect.js'
import viewsRouter from './routes/views.js'

import productRouter from './routes/productos.js'
import cartRouter from './routes/cart.js'

const server = express()

//Pre configs
server.use(express.json())
server.use(express.urlencoded({extended: true}))

//Handlebars config
server.engine('handlebars', handlebars.engine());
server.set('views', `${__dirname}/views`);
server.set('view engine', 'handlebars');

//Routes config
//Cart
//Message
//Products
server.use('/', viewsRouter)
server.use('/api/productos', productRouter)
server.use('/api/cart',cartRouter)


connect()


server.listen(8080, () => {
    console.log("Server running")
})


