import express from 'express'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import cookieParser from 'cookie-parser'
import connect from './utils/mongoo.connect.js'
import session from 'express-session'

import viewsRouter from './routes/views.js'
import productRouter from './routes/productos.js'
import cartRouter from './routes/cart.js'
import cookieRouter from './routes/cookies.js'

const server = express()

//Pre configs
server.use(express.json())
server.use(express.urlencoded({extended: true}))

//Session config
server.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))

//Static files config
server.use(express.static(`${__dirname}/public`))



//Handlebars config
server.engine('handlebars', handlebars.engine());
server.set('views', `${__dirname}/views`);
server.set('view engine', 'handlebars');



//Routes config
//Cart /Message /Products
server.use('/', viewsRouter)
server.use('/api/productos', productRouter)
server.use('/api/cart',cartRouter)
server.use('/api/cookies', cookieRouter)


//clase 18

//Cookies
//Cookie parser
server.use(cookieParser("secret"))

//CRUD COOKIES

/* server.get('/set-cookie', (req, res) => {
    res.cookie('test', 'test content', {
        maxAge: 1000 * 60 * 60 * 24 * 7,
    })
    res.send('Cookie set')
})

server.get('/get-cookie', (req, res) => {
    const cookie = req.cookies
    res.send(cookie)
})

server.get('/delete-cookie', (req, res) => {
    res.clearCookie('test')
    res.send('Cookie deleted')
}) */


//COOKIES FIRMADAS or signed cookies

/* server.get('/set-cookie', (req, res) => {
    res.cookie('test-signed', 'test content', {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        signed: true,
    })
    res.send('Cookie set')
})

server.get('/get-cookie', (req, res) => {
    res.send(req.signedCookies)
})

server.get('/delete-cookie', (req, res) => {
    res.clearCookie('test-signed')
    res.send('Cookie deleted')
})  */









connect()
server.listen(8080, () => {
    console.log("Server running")
})


