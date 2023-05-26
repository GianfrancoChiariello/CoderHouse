import { Router } from 'express';
import __dirname from '../utils.js'
import productos from '../dao/MongoDB/managers/product.manager.js'

const router = Router();

const productManager = new productos();

router.get('/', async (req, res) => {
    try {
        const productos = await productManager.getAll(req);
        console.log(productos)
        res.render('productos', {
            productos: productos?.docs.map(producto => producto.toObject()),
            paginate : productos
        })
    } catch (error) {
        console.log(error);
    }
})


router.get('/productos/:id', async (req,res) => {
    try {
        const producto = await productManager.getProductId(req.params.id)
        res.render('producto', { producto: producto.toObject() })
    } catch (error) {
        console.log(error)
    }
})


export default router;