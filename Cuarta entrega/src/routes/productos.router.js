import ProductManager from '../managers/productManager.js'
import {Router} from 'express'

const productosRouter = Router()


const productsMethod = new ProductManager('../productos.json')

/* id
title  T
description  T
code  T
price  T
status
stock  T
thumbnails  T */



productosRouter.get('/', async (req,res) => {
    const limit = req.query.limit

    try {
        const productos = await productsMethod.getProducts()
        
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

productosRouter.get('/:id', async (req,res) => {

    const id = Number(req.params.id)

    try {
        
        if (id) {
            const producto = await productsMethod.getProductById(id)
            return res.json(producto)
        }

    } catch (error) {
        res.json(error)
    }

})

productosRouter.post('/', async (req,res) => {

    const newProduct = req?.body

    try {

        return res.json(await productsMethod.addProduct(newProduct))

    } catch (error) {
        res.status(400).json({status: 'error', error})
    }


    return res.json('producto')
})

productosRouter.put('/:id',async (req,res) => {

    const id = Number(req.params.id)
    const updateBody = req.body



    try {
        
        if (id && updateBody) {
            return res.json(await productsMethod.updateProduct(id,updateBody))
        }

    } catch (error) {
        res.status(400).json({status: 'error',error})
    }

})

productosRouter.delete('/:id', async (req,res) => {

    const id = Number(req.params.id)

    try {
        
        if (id) {
            res.json(await productsMethod.deleteProduct(id))
        } 

    } catch (error) {
        res.status(400).json({status:'error', error})
    }

})




export default productosRouter