import {productsModel} from '../models/products.model.js'

export default class productos {
    constructor() {
        console.log("Product constructor starttted")
    }

    getAll = async (req) => {

        const { limit = 10, category = null, sort = null, page = 1 } = req?.query


        let pipeline = [];

        if (category) {
            pipeline.push({ $match: { categoria : category } });
        }
        
        if (sort) {
            const sortOrder = sort === 'asc' ? 1 : -1;
            pipeline.push({ $sort: { producto : sortOrder } });
        }
        
        const productos = pipeline.length ? await productsModel.aggregate(pipeline) : await productsModel.paginate({}, {
            limit: Number(limit),
            page: page,
        });


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
