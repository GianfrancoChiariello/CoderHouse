import {Router} from 'express'
import {
    getAllProducts,
    getProductId,
    newProductos,
    updateProduct,
    deleteProduct
} from '../controlers/products.js'
import {
    authorization,
    verifyToken
} from '../utils.js'

const router = Router()


router.get('/', getAllProducts)
router.get('/:id', getProductId)
router.patch('/:id',  verifyToken,authorization("admin"), updateProduct)
router.post('/new', verifyToken,authorization("admin"), newProductos)
router.delete('/delete/:id', verifyToken,authorization("admin"), deleteProduct)


export default router;