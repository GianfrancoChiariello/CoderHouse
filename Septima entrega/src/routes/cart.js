import {Router} from 'express'
import Cart from '../dao/MongoDB/managers/cart.manager.js'

const router = Router()
const cartManager = new Cart()

router.get('/:id', async (req,res) => {
    try {
        const cartFind = await cartManager.getCart(req.params.id)
        res.send({status: 'success', payload: cartFind})
    } catch (error) {
        res.status(500).send({status: "error", error})
    }
})

router.get('/', async (req,res) => {
    try {
        const cartFind = await cartManager.getCart()
        res.send({status: 'success', payload: cartFind})
    } catch (error) {
        res.status(500).send({status: "error", error})
    }
})

router.post('/new', async (req,res) => {
    try {
        const newCart = await cartManager.newCart(req.body)
        res.send({status: 'success', payload: newCart})
    } catch (error) {
        res.status(500).send({status: "failed", error})
    } 
})

router.post('/add/:id/:productId', async (req,res) => {
    try {
        const product = await cartManager.addProduct(req.params.id,req.params.productId)
        res.send({status: 'success', payload: product})
    } catch (error) {
        res.status(500).send({status: "failed", payload: error})
    }
})


router.delete('/delete/:id', async (req,res) => {
    try {
        const cartDelete = await cartManager.deleteCart(req.params.id)

        res.send({status: 'success', payload: cartDelete})
    } catch (error) {
        res.status(500).send({status: "failed", error})
    }
})

router.delete('/deleteProduct/:id/:idProduct', async (req,res) => {
    try {
        const deleteProduct = await cartManager.deleteProduct(req.params.id,req.params.idProduct)

        res.send({status: 'success', payload: deleteProduct})
    } catch (error) {
        res.status(500).send({status: "failed", error})
    }
})



export default router;






