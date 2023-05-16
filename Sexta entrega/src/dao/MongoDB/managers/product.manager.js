import {productsModel} from '../models/products.model.js'

export default class productos {
    constructor() {
        console.log("Product constructor starttted")
    }

    getAll = async () => {
        const productos = await productsModel.find()
        return productos.map(producto => producto.toObject());
    }

    getProductId = async (id) => {
        const producto = await productsModel.findById(id)
        return producto
    }

    newProductos = async (producto) => {
        const newProducto = productsModel.create(producto)
        return newProducto
    }

    deleteProduct = async (id) => {
        const producto = await productsModel.deleteOne(id)
        return {
            message: "delete succes",
            producto: producto
        }
    }

}