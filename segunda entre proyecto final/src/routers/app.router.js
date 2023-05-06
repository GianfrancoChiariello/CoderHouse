import { Router } from 'express';
import viewsRouter from './views.routes.js'
import productsRouter from './products.routes.js';


const router = Router()

router.use('/realtimeproducts', viewsRouter)

router.use('/api/products', productsRouter)



export default router