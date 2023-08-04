//import productos from '../dao/MongoDB/managers/product.manager.js'
import {productos} from '../dao/factory.js'
const productManager = new productos()


const getAllProductsService = async (req) => {
    const productos = await productManager.getAll(req)
    return productos
}

const getProductIdService = async (id) => {
    const productos = await productManager.getProductId(id)
    return productos
}

const newProductosService = async (producto) => {
    const newProducto = await productManager.newProductos(producto)
    return newProducto
}

const deleteProductService = async (id) => {
    const deleteProduct = await productManager.deleteProduct(id)
    return deleteProduct
}

const updateProductService = async (id, producto) => {
    const updateProduct = await productManager.updateProduct(id, producto)
    return updateProduct
}


export {
    getAllProductsService,
    getProductIdService,
    newProductosService,
    deleteProductService,
    updateProductService
}