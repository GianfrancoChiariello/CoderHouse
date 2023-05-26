import {productsModel} from '../models/products.model.js'

export default class productos {
    constructor() {
        console.log("Product constructor starttted")
    }

    getAll = async (req) => {

        //Limit de productos , default 10
        //page: numero de pagina , default 1
        //query: categoria o stock
        //sort: asc/desc , default sin sort
        //

        const { limit = 10 } = req?.params


/*         const productos = await productsModel.find()
        return productos */
        

        const productos = await productsModel.aggregate(
            [
                {
                    $limit: Number(limit),
                }
            ]
        )

        return productos

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
