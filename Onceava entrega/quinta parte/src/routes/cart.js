import {Router} from 'express'
import {
    getAllCart,
    getCart,
    newCart,
    addProduct,
    deleteCart,
    deleteProduct
} from '../controlers/cart.js'

const router = Router()


router.get('/', getAllCart)
router.get('/:id', getCart)
router.post('/new', newCart)
router.post('/add/:id/:productId', addProduct)
router.delete('/delete/:id', deleteCart)
router.delete('/deleteProduct/:id/:idProduct', deleteProduct) 


export default router;






