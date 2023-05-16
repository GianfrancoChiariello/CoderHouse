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

router.post('/new', async (req,res) => {
    try {
        const newCart = await cartManager.newCart(req.body)
        res.send({status: 'success', payload: newCart})
    } catch (error) {
        res.status(500).send({status: "failed", error})
    } 
})

router.post('/add/:id', async (req,res) => {
    try {
        const product = await cartManager.addProduct(req.params.id,req.body)
        res.send({status: 'success', payload: product})
    } catch (error) {
        res.status(500).send({status: "failed", payload: product})
    }
})



export default router;






