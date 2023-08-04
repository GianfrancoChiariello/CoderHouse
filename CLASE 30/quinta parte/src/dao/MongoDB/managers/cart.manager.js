import {cartModel} from '../models/cart.model.js'
import {productsModel} from '../models/products.model.js'
import {ticketModel} from '../models/ticket.model.js'

export default class Cart {
    constructor() {
        console.log("Cart constructor start")
    }

    getCart = async (id) => {

        const cartFind = id ? await cartModel.findById(id) : await cartModel.find()
        
        return cartFind
    }

    newCart = async (cart) => {
        const cartNew = await cartModel.create(cart)
        return cartNew
    }

    addProduct = async (id,producto) => {
        await cartModel.findByIdAndUpdate(id,{
            $push: {productos: producto}
        })
        
        const cart = this.getCart(id)

        return cart
    }

    deleteProduct = async (id, idProduct) => {
        
        const deleted = await cartModel.findByIdAndUpdate(id,{
            $pull: {productos: idProduct}
        })

        return deleted
    }
 
    deleteCart = async (id) => {
        const cartDelete = await cartModel.findByIdAndDelete(id)
        return cartDelete
    }

    purchaseCart = async (id) => {
        const cart = await cartModel.findById(id)

        const products = cart.productos
        const productsId = products.map(product => product._id)
        const productsStock = products.map(product => product.stock)
        const productsPrice = products.map(product => product.precio)

        const productsStockVerify = await productsModel.find({
            _id: {
                $in: productsId
            }
        })

        const productsStockVerifyStock = productsStockVerify.map(product => product.stock)

        const productsStockVerifyStockResult = productsStockVerifyStock.map((stock,index) => {
            if(stock >= productsStock[index]) {
                return true
            } else {
                return false
            }
        })

        const productsStockVerifyStockResultFinal = productsStockVerifyStockResult.every(result => result === true)

        if(productsStockVerifyStockResultFinal) {
            productsStockVerifyStock.forEach((stock,index) => {
                productsStockVerify[index].stock = stock - productsStock[index]
            })

            productsStockVerify.forEach(async product => {
                await productsModel.findByIdAndUpdate(product._id,product)
            })

            const ticket = {
                amount: productsPrice.reduce((a,b) => a + b, 0),
                purchaser: cart.email
            }
        }

        const ticketNew = await ticketModel.create(ticket)

        return ticketNew
    }
}