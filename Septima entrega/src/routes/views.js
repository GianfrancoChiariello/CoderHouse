import { Router } from 'express';
import __dirname from '../utils.js'
import productos from '../dao/MongoDB/managers/product.manager.js'

const router = Router();

const productManager = new productos();

router.get('/', async (req, res) => {
    try {
        const productos = await productManager.getAll();
        res.render('productos', { productos })   
    } catch (error) {
        console.log(error);
    }
})


router.get('/productos', async (req,res) => {
    try {
        const productos = await productManager.getAll()
        res.render('productos', {productos})
    } catch (error) {
        console.log(error)
    }
})


export default router;