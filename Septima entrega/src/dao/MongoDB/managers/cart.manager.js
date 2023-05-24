import {cartModel} from '../models/cart.model.js'

export default class Cart {
    constructor() {
        console.log("Cart constructor start")
    }

    getCart = async (id) => {
        const cartId = await cartModel.findById(id)
        return cartId
    }

    newCart = async (cart) => {
        const cartNew = await cartModel.create(cart)
        return cartNew
    }

    addProduct = async (id,producto) => {
        const cartAdd = await cartModel.findByIdAndUpdate(id,{$push: {productos: producto}})
        const cart = this.getCart(id)

        return cart
    }

}