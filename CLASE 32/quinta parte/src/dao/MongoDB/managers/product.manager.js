import {productsModel} from '../models/products.model.js'
import {
    generateProductErrorInfo
} from '../../../customErrors/info.js'
import CustomError from '../../../customErrors/customErr.js'
import EErros from '../../../customErrors/enums.js'

export default class productos {
    constructor() {
        console.log("Product constructor starttted")
    }

    getAll = async (req) => {
        const { limit = 1, category = null, sort = null, page = 1 } = req?.query

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

    updateProduct = async (id, producto) => {
        const updateProduct = await productsModel.updateOne(id, producto)
        return updateProduct
    }

    getProductId = async (id) => {
        const producto = await productsModel.findById(id)

        if (!producto) {
            throw CustomError.createError({
                name: 'ProductNotFound',
                cause: productNotFoundError(id),
                message: 'Product not found',
                code: EErros.PRODUCT_NOT_FOUND
            })
        }

        return producto
    }

    newProductos = async (producto) => {

        const product = await productsModel.findOne({ producto: producto.producto })

        if (product) {
            throw CustomError.createError({
                name: 'ProductAlreadyExists',
                cause: generateProductErrorInfo(producto),
                message: 'Product already exists',
                code: EErros.PRODUCT_ALREADY_EXISTS
            })
        }

        const newProducto = productsModel.create(producto)
        return newProducto
    }

    deleteProduct = async (id) => {
        const producto = await productsModel.findById(id)


        if (!producto) {
            throw CustomError.createError({
                name: 'ProductNotFound',
                cause: productNotFoundError(id),
                message: 'Product not found',
                code: EErros.PRODUCT_NOT_FOUND
            })
        }

        const productodd = await productsModel.deleteOne(id)
        return {
            message: "delete succes",
            producto: productodd
        }
    }

}
