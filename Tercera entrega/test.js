import ProductManager from "./productManager.js"
import express from 'express'

const app = express()

const start = new ProductManager('./productos.json')


app.get('/productos', async (req,res) => {
    const limit = req.query.limit

    try {
        const productos = await start.getProducts()
        
        if (limit) {
            const modifyed = productos.slice(0,limit)
            res.json(modifyed)
        } else {
            res.json(productos)
        }

    } catch (error) {
        res.json(error)
    }

})

app.get('/producto/:id', async (req,res) => {

    const id = Number(req.params.id)

    try {
        
        if (id) {
            const producto = await start.getProductById(id)
            return res.json(producto)
        }

    } catch (error) {
        res.json(error)
    }

})

app.listen(8000,() => console.log("server on"))