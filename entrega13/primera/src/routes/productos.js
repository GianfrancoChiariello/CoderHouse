import {Router} from 'express'
import {
    getAllProducts,
    getProductId,
    newProductos,
    deleteProduct
} from '../controlers/products.js'

const router = Router()


router.get('/', getAllProducts)
router.get('/:id', getProductId)
router.post('/new', newProductos)
router.delete('/delete/:id', deleteProduct)


export default router;