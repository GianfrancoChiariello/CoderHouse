import { Router } from 'express';
import __dirname from '../utils.js'
import productos from '../dao/MongoDB/managers/product.manager.js'
import cart from '../dao/MongoDB/managers/cart.manager.js'

const router = Router();

const productManager = new productos();
const cartManager = new cart();

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

router.get('/cart/:id', async (req,res) => {
    try {
        const cart = await cartManager.getCart(req.params.id)
        /* const cart = await cartManager.getCart("646fc534e0a97f371ebd345e") */
        res.render('cart', { 
            productosCart: cart?.productos.map(producto => producto.toObject()),
            cart: cart.toObject()
        })
    } catch (error) {
        console.log(error)
    }
})


export default router;