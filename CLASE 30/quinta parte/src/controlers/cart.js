import {
    getAllCartService,
    getCartService,
    newCartService,
    addProductService,
    deleteCartService,
    deleteProductService,
    purchaseCartService
} from '../services/cart.js'


export const getAllCart = async (req,res) => {
    const products = await getAllCartService()
    res.send(products)
}

export const getCart = async (req,res) => {
    const products = await getCartService(req.params.id)
    res.send(products)
}

export const newCart = async (req,res) => {
    const cart = await newCartService(req.body)
    res.send(cart)
}

export const addProduct = async (req,res) => {
    const cart = await addProductService(req.params.id,req.params.productId)
    res.send(cart)
}

export const deleteCart = async (req,res) => {
    const cartDelete = await deleteCartService(req.params.id)
    res.send(cartDelete)
}

export const deleteProduct = async (req,res) => {
    const deleteProduct = await deleteProductService(req.params.id,req.params.idProduct)
    res.send(deleteProduct)
}

export const purchaseCart = async (req,res) => {
    const purchaseCart = await purchaseCartService(req.params.id)
    res.send(purchaseCart)
}

