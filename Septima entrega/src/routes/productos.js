import {Router} from 'express'
import productos from '../dao/MongoDB/managers/product.manager.js'

const router = Router()
const productManager = new productos()

router.get('/', async (req,res) => {
    try {
        const productos = await productManager.getAll(req.query)
        res.send({status: 'success', payload: productos})
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
})

router.get('/:id', async (req,res) => {
    try {
        const producto = await productManager.getProductId(req.params.id)
        res.send({status: 'success', payload: producto})
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
})


router.post('/new', async (req,res) => {
    try {
        const neWproductos = await productManager.newProductos(req.body)
        res.send({status: 'success', payload: neWproductos})
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
})

router.delete('/delete/:id', async (req,res) => {
    try {
        const deleteProduct = await productManager.deleteProduct(req.params.id)
        res.send({status: 'success', payload: deleteProduct})
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
})



export default router;