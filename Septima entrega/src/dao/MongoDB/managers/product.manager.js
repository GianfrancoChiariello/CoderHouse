import {productsModel} from '../models/products.model.js'

export default class productos {
    constructor() {
        console.log("Product constructor starttted")
    }

    getAll = async (query) => {

        //Limit de productos , default 10
        //page: numero de pagina , default 1
        //query: tipo de elemento , default busqueda general
        //sort: asc/desc , default sin sort

        const { limit = 10, page = 1, sort = 'asc'} = query;



        const productos = await productsModel.find()
        return productos
        /* return productos.map(producto => producto.toObject()); */
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