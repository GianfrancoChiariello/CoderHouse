import { Router } from 'express';
import __dirname from '../utils.js'
import productos from '../dao/MongoDB/managers/product.manager.js'
import mensajes from '../dao/MongoDB/managers/message.manager.js'

const router = Router();

const productManager = new productos();
const mensajesManager = new mensajes();

router.get('/', async (req, res) => {
    try {
        const productos = await productManager.getAll();
        res.render('productos', { productos })   
    } catch (error) {
        console.log(error);
    }
})

router.get('/chat', async (req,res) => {
    try {
        const mensajes = await mensajesManager.getAll()
        res.render('chat', { mensajes })   
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