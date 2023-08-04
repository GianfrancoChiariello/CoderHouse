import express from 'express'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import cookieParser from 'cookie-parser'
import initializePassport from './config/passport.config.js'
import viewsRouter from './routes/views.js'
import productRouter from './routes/productos.js'
import cartRouter from './routes/cart.js'
import mockingProductsRouter from './routes/mocking.js'
import sessionRouter from './routes/sessions.js'
import passport from 'passport'
import config from './config.js'
import 
    errorHandler
 from './customErrors/index.js'

const server = express()
//Pre configs
server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(express.static(`${__dirname}/public`))



//Handlebars config
server.engine('handlebars', handlebars.engine());
server.set('views', `${__dirname}/views`);
server.set('view engine', 'handlebars');


//Routes config
//Cart /Message /Products
server.use('/', viewsRouter)
server.use('/api/auth', sessionRouter)
server.use('/api/productos', productRouter)
server.use('/api/cart',cartRouter)
server.use('/api/mockingProducts',mockingProductsRouter)

//Cookie parser
server.use(cookieParser())

//passport
initializePassport()
server.use(passport.initialize())

//Error handler
server.use(errorHandler)

//connect()
server.listen(config.ports, () => {
    console.log("Server running")
})

server.on('error', (err) => {
    console.log(err)
})

server.on('request', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello World\n')
})

