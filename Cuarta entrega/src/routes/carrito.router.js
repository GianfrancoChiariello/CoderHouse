import {Router} from 'express'
import CarritoManager from '../managers/carritoManager.js'

const carritoRouter = Router()

const carritoManager = new CarritoManager('./carritos.json')


carritoRouter.get('/', async (req,res) => {

   try {
    res.json(await carritoManager.getCarts())
   } catch (error) {
    res.status(400).json(error)
   }

})

carritoRouter.post('/', async (req,res) => {

    try {
        res.json(await carritoManager.createCart())
    } catch (error) {
        res.status(400).json(error)
    }

})

carritoRouter.get('/:id', async (req,res) => {
    
    const id = Number(req.params.id)

    try {
        if (id) {
            res.json(await carritoManager.getProductCart(id))
        }
    } catch (error) {
        res.status(400).json({status:'error',error})
    }

})

carritoRouter.post('/:id', async (req,res) => {

    const id = Number(req.params.id)
    const producto = req.body

    try {
        
        res.json(await carritoManager.addProductCart(id,producto))
        

    } catch (error) {
        res.status(400).json(error)
    }

})

export default carritoRouter