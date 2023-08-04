import {Router} from 'express'
import {
    getAllCart,
    getCart,
    newCart,
    addProduct,
    deleteCart,
    deleteProduct,
    purchaseCart
} from '../controlers/cart.js'
import {
    authorization,
    verifyToken
} from '../utils.js'

const router = Router()


router.get('/', getAllCart)
router.get('/:id', verifyToken,authorization("client"), getCart)
router.post('/new', verifyToken,authorization("client"), newCart)
router.post('/add/:id/:productId',verifyToken,authorization("client"),  addProduct)
router.delete('/delete/:id', verifyToken,authorization("client"), deleteCart)
router.delete('/deleteProduct/:id/:idProduct', verifyToken,authorization("client"), deleteProduct) 
router.post('/purchase/:id', verifyToken,authorization("admin"), purchaseCart)


export default router;






