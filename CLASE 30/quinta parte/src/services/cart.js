import {Cart} from '../dao/factory.js'

const cartManager = new Cart()


const getAllCartService = async () => {
    const cartFind = await cartManager.getCart()
    return cartFind
}

const getCartService = async (id) => {
    const cartFind = await cartManager.getCart(id)
    return cartFind
}

const newCartService = async (cart) => {
    const cartNew = await cartManager.newCart(cart)
    return cartNew
}

const addProductService = async (id,producto) => {
    const cart = await cartManager.addProduct(id,producto)
    return cart
}

const deleteCartService = async (id) => {
    const cartDelete = await cartManager.deleteCart(id)
    return cartDelete
}

const deleteProductService = async (id, idProduct) => {
    const deleteProduct = await cartManager.deleteProduct(id,idProduct)
    return deleteProduct
}

const purchaseCartService = async (id) => {
    const purchaseCart = await cartManager.purchaseCart(id)
    return purchaseCart
}



export {
    getAllCartService,
    getCartService,
    newCartService,
    addProductService,
    deleteCartService,
    deleteProductService,
    purchaseCartService
}
