import express from 'express'
import productosRouter from './routes/productos.router.js'
import carritoRouter from './routes/carrito.router.js'

const app = express()
app.use(express.json())
app.listen(8000,() => console.log("server on"))


app.use('/api/productos', productosRouter)
app.use('/api/carrito', carritoRouter)




