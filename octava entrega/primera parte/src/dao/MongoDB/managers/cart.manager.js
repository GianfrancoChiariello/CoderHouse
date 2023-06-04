import {cartModel} from '../models/cart.model.js'

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

}