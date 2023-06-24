import express from 'express'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import cookieParser from 'cookie-parser'
import connect from './utils/mongoo.connect.js'
import session from 'express-session'
import initializePassport from './config/passport.config.js'
import MongoStore from 'connect-mongo'
import viewsRouter from './routes/views.js'
import productRouter from './routes/productos.js'
import cartRouter from './routes/cart.js'
import cookieRouter from './routes/cookies.js'
import sessionRouter from './routes/sessions.js'
import passport from 'passport'

const server = express()
//Pre configs
server.use(express.json())
server.use(express.urlencoded({extended: true}))


server.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://GChiariello:HacknCYMbuFN37CB@mybase.njpijon.mongodb.net/ecommerce?retryWrites=true&w=majority',
        ttl: 15,
        mongoOptions: {
            //Para especificar nueva estructura de string connection
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    })
}))



//Static files config
server.use(express.static(`${__dirname}/public`))


//passport
initializePassport()
server.use(passport.initialize())
server.use(passport.session())

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
server.use('/api/session', sessionRouter)



//Cookie parser
server.use(cookieParser("secret"))


connect()
server.listen(8080, () => {
    console.log("Server running")
})

