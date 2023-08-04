import {
    getAllProductsService,
    getProductIdService,
    newProductosService,
    deleteProductService,
    updateProductService
} from '../services/products.js'


const getAllProducts = async (req,res) => {
    const products = await getAllProductsService(req)
    res.send(products)
}

const getProductId = async (req,res) => {
    const products = await getProductIdService(req.params.id)
    res.send(products)
}

const newProductos = async (req,res) => {
    const product = await newProductosService(req.body)
    res.send(product)
}

const deleteProduct = async (req,res) => {
    const deleteProduct = await deleteProductService(req.params.id)
    res.send(deleteProduct)
}

const updateProduct = async (req,res) => {
    const updateProduct = await updateProductService(req.params.id, req.body)
    res.send(updateProduct)
}

export {
    getAllProducts,
    getProductId,
    newProductos,
    deleteProduct,
    updateProduct
}